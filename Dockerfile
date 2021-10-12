FROM node:16.10.0-alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY tsconfig.json .
COPY . .
# RUN npm run build
CMD [ "npm", 'run', 'dev']
