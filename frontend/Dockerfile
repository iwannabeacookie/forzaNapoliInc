# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory for the frontend
WORKDIR /usr/src/app

# Copy frontend package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the frontend code
COPY . ./

ENV NODE_ENV=production
ENV NITRO_PORT=10000
ENV NUXT_API_URL=https://cd-api1-6bafkhtnna-ew.a.run.app

# Build the frontend
RUN npm run build

# Expose ports
EXPOSE 10000

# Start both the backend and frontend using PM2
CMD ["node", ".output/server/index.mjs"]
