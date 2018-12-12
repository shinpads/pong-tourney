FROM node:9.2

RUN mkdir -p /usr/src/pong-tourney
WORKDIR /usr/src/pong-tourney
COPY ./pong-tourney/ ./

RUN npm install
RUN npm run build:dev
CMD ["npm", "start"]
