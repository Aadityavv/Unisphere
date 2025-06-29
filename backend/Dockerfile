# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first (for better cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application files
COPY . .

# Expose port (optional but good for clarity)
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
