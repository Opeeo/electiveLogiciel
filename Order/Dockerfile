FROM node:latest

COPY . /backend

WORKDIR /backend

RUN npm install --production

EXPOSE 3000

CMD npm i ; npm i express-async-handler; npx prisma generate; npx prisma migrate dev --name init; npm run server; 