# 기본 Node 이미지
FROM mcr.microsoft.com/devcontainers/javascript-node:20

# 바이옴 설치 (ESLint + Prettier 대체)
RUN npm install -g biome

# Git 초기화 정보 줄이기 (옵션)
RUN git config --global init.defaultBranch main
