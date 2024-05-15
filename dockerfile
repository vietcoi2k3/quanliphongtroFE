FROM node:18-alpine

RUN mkdir /app
COPY package*.json /app

WORKDIR /app

RUN npm install && yarn install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]