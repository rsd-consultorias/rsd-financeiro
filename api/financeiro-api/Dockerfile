FROM node:16

COPY package*.json ./

RUN npm i

COPY ./build/ .

EXPOSE 4201
CMD ["node", "main.js"]