FROM node:16

# Create app directory
WORKDIR .\

# Install dependencies
COPY package*.json ./

RUN npm install

COPY extended-calculator.js .

# This port is exposed in the container
EXPOSE 3000
CMD [ "node", "extended-calculator.js"]