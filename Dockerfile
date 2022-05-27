FROM node:16

ENV TZ="Europe/Bucharest"

RUN date

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

CMD npm audit fix --force

RUN npm install -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD serve -s build
