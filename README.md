# About

I cloned forgejo official repo, and modify the following parts.

1. Main theme: add codeberg's theme
2. Logo: Changed to my own logo
3. Public index page: remove forgejo information page and show a simple lifegame animiation on it

Current version is based on forgejo 15.0.1

## Build

```bash
docker build --build-arg RELEASE_VERSION=15.0.1.2000 -t forgejo:v15.0.1.2000 .
```

## Tips

如果在构建过程中，出现 ESBuild 相关错误，可删除 node_modules 后重试。

请不要忘记

```bash
make clean-all
make generate-images
```
