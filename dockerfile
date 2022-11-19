FROM node:16 as build
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
CMD ["npm","run","prodstart"]