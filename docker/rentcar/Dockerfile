FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# 刪除 node_modules 並重新安裝依賴項
RUN rm -rf node_modules && npm install

EXPOSE 3000
CMD [ "npm", "run", "start:dev"]