FROM node:14-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY tsconfig.json ./
COPY . .
RUN ls -a
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "node", "./dist/app.js" ]
