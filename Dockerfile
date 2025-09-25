# Use the official Node.js 20 image.
FROM node:20-alpine

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

# The "preview" script runs on port 4321 by default.
EXPOSE 4321

# The command to run the application using Astro's preview server.
# The "--host" flag is necessary to expose the server to the host machine.
CMD [ "npm", "run", "preview", "--", "--host", "0.0.0.0" ]
