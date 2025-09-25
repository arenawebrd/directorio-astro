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

# Build the application with verbose logging for debugging.
RUN npm run build -- --verbose

# The "preview" script runs on port 4321 by default.
EXPOSE 4321

# The command to run the application using Astro's preview server.
# The "--host" flag is necessary to expose the server to the host machine.
CMD [ "npm", "run", "preview", "--", "--host", "0.0.0.0" ]

