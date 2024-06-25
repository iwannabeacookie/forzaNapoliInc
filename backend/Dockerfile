# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory for the backend
WORKDIR /usr/src/app

# Copy backend package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the backend code
COPY . ./

# Expose ports
EXPOSE 3000

ENV GOOGLE_ID=570448119164-dpr7r1b1jch691msibjtvage023vfmqn.apps.googleusercontent.com
ENV GOOGLE_SECRET=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
ENV MONGODB_URI=mongodb+srv://iwannabeacookie:sGJQHv3nePFLzoym@forzanapoliinc.tqmgi1i.mongodb.net/Data?retryWrites=true&w=majority&appName=ForzaNapoliInc
ENV SESSION_SECRET=ForzaNapoliPorcoDioPizdiec

# Start both the backend and frontend using PM2
CMD ["npm", "run", "prod"]
