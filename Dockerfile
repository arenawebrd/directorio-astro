# Use the official Node.js 20 image.
FROM node:20-alpine

# Define build arguments
ARG PUBLIC_MAPTILER_KEY
ARG POSTGRES_HOST
ARG POSTGRES_PORT
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DATABASE
ARG POSTGRES_URL
ARG TIMEZONE
ARG GIT_SHA

# Set environment variables from build arguments
ENV PUBLIC_MAPTILER_KEY=$PUBLIC_MAPTILER_KEY
ENV POSTGRES_HOST=$POSTGRES_HOST
ENV POSTGRES_PORT=$POSTGRES_PORT
ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
ENV POSTGRES_DATABASE=$POSTGRES_DATABASE
ENV POSTGRES_URL=$POSTGRES_URL
ENV TIMEZONE=$TIMEZONE
ENV GIT_SHA=$GIT_SHA

# Set the working directory in the container.
WORKDIR /app

# Copy package.json and package-lock.json to the working directory.
COPY package*.json ./

# Install project dependencies.
RUN npm install

# Copy the rest of the application's source code.
COPY . .

# Build the application.
RUN npm run build

# Expose the port the server will run on.
EXPOSE 4321

# The command to run the standalone server.
CMD [ "node", "./dist/server/entry.mjs" ]


