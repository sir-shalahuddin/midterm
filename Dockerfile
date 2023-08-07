FROM node:latest
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]
