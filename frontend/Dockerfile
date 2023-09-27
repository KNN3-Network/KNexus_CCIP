# 设置基础镜像
FROM node:16.18.1

# 设置工作目录
WORKDIR /app

# 安装依赖
RUN npm install pnpm -g

# 将应用程序源代码复制到工作目录
COPY . .

# 暴露应用程序运行的端口号
EXPOSE 3000

# 构建应用程序
RUN pnpm install && pnpm run build

# 运行应用程序
CMD ["pnpm", "run", "start"]
