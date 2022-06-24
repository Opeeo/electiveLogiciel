FROM node:latest

COPY . /backend

WORKDIR /backend

RUN npm install --production

EXPOSE 3000

CMD npm i ; npx prisma generate ; npm start; npx prisma migrate dev --name init