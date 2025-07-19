# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install --production

# Copy app source
COPY . .

# Set environment variable for production
ENV NODE_ENV=production

# Expose the port (match the one in your app)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
