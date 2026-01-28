# Use the Official Node.js 18 image as the base image
FROM node:lts-alpine3.23 AS development

# Set the working direcotory inside the container
WORKDIR /frontend 

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files in the application code to the working directory
COPY . .

# Expose port 5173 for the application
EXPOSE 5173

# Start the React development server with hot-reloading
CMD ["npm", "run", "dev"]
