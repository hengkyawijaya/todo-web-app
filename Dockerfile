FROM node:carbon

WORKDIR /app

COPY . /app

RUN npm install -g serve

RUN npm install

RUN npm build

COPY . /app

CMD serve -p 5000 build

EXPOSE 5000

