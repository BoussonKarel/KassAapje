# front/Dockerfile
# First, we build our app to be compiled as Javascript
FROM node:16.9.1-alpine as build-container
WORKDIR /usr/app
COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]
RUN npm ci
COPY . .
# /usr/app/dist
RUN npm run build

## Now, we create a secondary container, to be used in production
FROM node:16.9.1-alpine as production-container
WORKDIR /usr/app

COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --only=production
RUN npm install sirv-cli -g
COPY --from=build-container /usr/app/dist .
EXPOSE 8080

CMD ["npm", "start"]