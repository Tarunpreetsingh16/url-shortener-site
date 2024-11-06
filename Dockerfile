# Step 1: Use the official Node.js image as the build environment
FROM node:16 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install the app dependencies
RUN npm install

# Copy the environment file
COPY .env.production .env.production

# Step 5: Copy the entire project into the container
COPY . .

# Step 6: Build the app for production
RUN npm run build

# Step 7: Use a lighter web server (like Nginx) to serve the static files
FROM nginx:alpine

# Step 8: Copy the build directory from the build container to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80 to be able to access the app in the browser
EXPOSE 80

# Step 10: Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
