FROM node:latest

COPY . /backend

WORKDIR /backend

RUN npm install --production

EXPOSE 3000

CMD npm start