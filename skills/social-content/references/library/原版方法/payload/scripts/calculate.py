#!/usr/bin/env python3
"""Explicit-scope arithmetic only. Reads one JSON from --stdin; never writes files."""
import argparse
import json
import re
import sys
from datetime import datetime
from decimal import Decimal, localcontext


def need(test, message):
    if not test:
        raise ValueError(message)


def text(value, name):
    need(isinstance(value, str) and bool(value.strip()), name + " required")
    return value


def number(value, name, positive=False):
    if value is None:
        return None
    need(isinstance(value, str) and bool(re.fullmatch(r"-?[0-9]{1,30}(?:\.[0-9]{1,30})?", value)), name + " must be a decimal string or null")
    need(sum(c.isdigit() for c in value) <= 30, name + " exceeds 30 digits")
    result = Decimal(value)
    need(result.is_finite(), name + " must be finite")
    need(not positive or result >= 0, name + " must be nonnegative")
    return result


def ids(values, name):
    need(isinstance(values, list), name + " must be a list")
    for value in values:
        text(value, name)
    need(len(set(values)) == len(values), name + " contains duplicates")
    return set(values)


def string(value):
    return None if value is None else format(value, "f")


def frame(d, currency):
    need(isinstance(d, dict), "object required")
    text(d.get("scope"), "scope")
    text(d.get("basis"), "basis")
    need(d.get("currency") == currency, "currency mismatch or missing")


def scenario(d, currency):
    frame(d, currency)
    text(d.get("id"), "scenario id")
    required = ids(d.get("required_components"), "required_components")
    included = ids(d.get("included"), "included")
    need(included <= required, "undeclared included components")
    need(isinstance(d.get("costs"), list), "costs list required")
    seen = set(included)
    unknown = []
    deducted = Decimal(0)
    for cost in d["costs"]:
        need(isinstance(cost, dict), "cost object required")
        name = text(cost.get("component"), "component")
        need(name in required, "undeclared cost: " + name)
        need(name not in seen, "overlap or repeated cost: " + name)
        seen.add(name)
        amount = number(cost.get("amount"), name, True)
        if amount is None:
            unknown.append(name)
        else:
            deducted += amount
    unknown += sorted(required - seen)
    revenue = number(d.get("revenue"), "revenue")
    if revenue is None:
        unknown.append("revenue")
    remainder = None if revenue is None else revenue - deducted
    return {"id": d["id"], "scope": d["scope"], "basis": d["basis"],
            "status": "partial" if unknown else "complete_within_declared_scope",
            "known_deductions": string(deducted), "known_cost_remainder": string(remainder),
            "declared_scope_remainder": None if unknown else string(remainder),
            "unknown": unknown, "not_net_profit": True}


def cash(d, currency):
    frame(d, currency)
    need(d.get("coverage") in ("complete", "partial"), "cash coverage required")
    balance = number(d.get("opening"), "opening")
    reserve = number(d.get("reserve"), "reserve", True)
    need(isinstance(d.get("events"), list), "events required")
    minimum = balance
    timeline = []
    previous = None
    names = set()
    forecast = False
    for event in d["events"]:
        need(isinstance(event, dict), "event object required")
        name = text(event.get("id"), "event id")
        need(name not in names, "repeated event")
        names.add(name)
        stamp = text(event.get("at"), "timestamp")
        need(bool(re.fullmatch(r"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z", stamp)), "UTC timestamp required")
        when = datetime.strptime(stamp, "%Y-%m-%dT%H:%M:%SZ")
        need(previous is None or when > previous, "events must be strictly time ordered")
        previous = when
        need(event.get("direction") in ("in", "out"), "direction required")
        need(event.get("state") in ("observed", "forecast"), "event state required")
        forecast = forecast or event["state"] == "forecast"
        amount = number(event.get("amount"), "event amount", True)
        balance = None if balance is None or amount is None else balance + (amount if event["direction"] == "in" else -amount)
        if balance is not None:
            minimum = balance if minimum is None else min(minimum, balance)
        timeline.append({"id": name, "at": stamp, "balance": string(balance),
                         "conditional_on_forecasts": forecast,
                         "reserve_gap": None if balance is None or reserve is None else string(max(Decimal(0), reserve - balance))})
    all_known = balance is not None
    return {"scope": d["scope"], "coverage": d["coverage"], "conditional_forecast": forecast,
            "opening": string(number(d.get("opening"), "opening")), "timeline": timeline,
            "ending": string(balance), "known_prefix_minimum": string(minimum),
            "full_declared_timeline_minimum": string(minimum) if all_known else None,
            "known_prefix_reserve_gap": None if minimum is None or reserve is None else string(max(Decimal(0), reserve-minimum)),
            "all_cashflows_proven": False, "reserve": string(reserve)}


def ratio(d):
    need(isinstance(d, dict), "ratio object required")
    label = text(d.get("label"), "ratio label")
    basis = text(d.get("basis"), "ratio basis")
    a = number(d.get("numerator"), "numerator", True)
    b = number(d.get("denominator"), "denominator", True)
    with localcontext() as ctx:
        ctx.prec = 28
        value = None if a is None or b is None or b == 0 else string(a/b)
    return {"label": label, "basis": basis, "numerator": string(a), "denominator": string(b), "value": value,
            "status": "unknown" if value is None else "descriptive_only", "precision": "28 significant digits; HALF_EVEN", "causal": False}


def calculate(data):
    need(isinstance(data, dict), "JSON object required")
    currency = text(data.get("currency"), "currency")
    need(bool(re.fullmatch(r"[A-Z]{3}", currency)), "three-letter currency required")
    need(set(data) <= {"currency", "scenarios", "cash", "ratios"}, "unknown top-level fields")
    need(any(k in data for k in ("scenarios", "cash", "ratios")), "no operation provided")
    result = {"currency": currency, "contract": "social-decimal-v1", "financial_advice": False}
    with localcontext() as ctx:
        ctx.prec = 100
        if "scenarios" in data:
            need(isinstance(data["scenarios"], list) and bool(data["scenarios"]), "nonempty scenarios required")
            result["scenarios"] = [scenario(d, currency) for d in data["scenarios"]]
            names = [d["id"] for d in result["scenarios"]]
            need(len(set(names)) == len(names), "duplicate scenario id")
        if "cash" in data:
            result["cash"] = cash(data["cash"], currency)
        if "ratios" in data:
            need(isinstance(data["ratios"], list) and bool(data["ratios"]), "nonempty ratios required")
            result["ratios"] = [ratio(d) for d in data["ratios"]]
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--stdin", action="store_true", help="Read exactly one explicit JSON object from stdin")
    args = parser.parse_args()
    if not args.stdin:
        parser.print_help()
        return 0
    try:
        result = calculate(json.load(sys.stdin))
    except (ValueError, TypeError, KeyError, ArithmeticError) as exc:
        print(json.dumps({"status": "rejected", "reason": str(exc)}, ensure_ascii=False))
        return 2
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
