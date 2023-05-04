# Use an official Node.js runtime as the base image
FROM node:18.15.0

# Set the working directory inside the container
WORKDIR /front

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Set the command to build the React app
CMD [ "npm", "run", "build" ]
