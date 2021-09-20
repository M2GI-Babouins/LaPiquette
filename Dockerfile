FROM node:12.7-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./

RUN ./mvnw -DskipTests clean dependency:list install

CMD "mongod & ./mvnw & npm start"
