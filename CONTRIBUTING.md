# 参与共创

欢迎补充可复现的问题、改进方法与模板、增加原创合成案例、改善翻译和安装体验。

1. Fork 本仓库，创建小范围分支。先说明具体用户任务与当前不足。
2. 改动对应 Skill 的入口或随包方法；保持引用自足、未知诚实、来源许可清楚。
3. 提交合成输入、改动前后的完整输出与改善依据。格式或安装改动按对应风险测试，不要求重新审核全部领域。
4. 更新 catalog、CHANGELOG 和内容清单。内容清单是文件身份，不是业务效果证明。
5. 运行检查后提交 PR，说明影响、验证及剩余限制。

```bash
python3 scripts/refresh_manifest.py
python3 scripts/validate_structure.py
python3 scripts/scan_public_leaks.py
python3 -m unittest discover -s tests -v
```

禁止提交客户隐私、凭证、私人联系方式、原始付费课程或未获许可的内容。保留第三方版权声明。你的贡献按项目 MIT 许可提供；第三方内容必须注明自身许可。

源方法中的历史验证边界保持可见，不把一个示例通过写成全业务通用。没有真实账户授权时只验证离线任务，不发布或花费。
