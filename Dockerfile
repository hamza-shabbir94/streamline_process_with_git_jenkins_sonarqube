FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install mysql2
RUN npm install aws-sdk

COPY global-bundle.pem ./

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
