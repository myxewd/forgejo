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
