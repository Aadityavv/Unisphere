# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the frontend source code
COPY . .

# Build the production version
RUN npm run build

# Install a simple static server to serve the app
RUN npm install -g serve

# Set command to serve the build directory
CMD ["serve", "-s", "dist", "-l", "3000"]
