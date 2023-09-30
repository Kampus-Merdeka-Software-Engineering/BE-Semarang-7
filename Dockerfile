FROM node:alpine

WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env.example ./env

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

# install dependencies
RUN npm install --production
RUN npm install esbuild

# generating prisma client
RUN npx prisma generate

# Run and expose the server on port 8080
EXPOSE 8080

# Build the app
RUN npm run build

# Run the app
CMD [ "npm", "start" ]