# Use an official Node.js runtime as the base image
FROM node:latest

# Update Dep
RUN apt-get update

# Set the working directory within the container
WORKDIR /app

# Install a specific version of npm
RUN npm install -g npm@9.8.1

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port your application will run on (Next.js default is 3000)
EXPOSE 3000

# Define the command to start your application
CMD ["npm", "run", "dev"]
