# Use Node.js 14 LTS version as the base image
FROM node:14

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "./app.js"]
