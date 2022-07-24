FROM node:17

COPY src /app
COPY *.json /app
COPY .env /app
WORKDIR /app

RUN npm install
ENTRYPOINT npm start