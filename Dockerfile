FROM node:14-alpine
WORKDIR /usr/src/app
COPY src .
RUN apk --no-cache add curl
RUN npm i
CMD [ "npm", "start"]