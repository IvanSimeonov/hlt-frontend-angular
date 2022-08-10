# STAGE 1: Build app
FROM node:16.16.0-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN $(npm bin)/ng build

# STAGE 2: Setup Server
FROM nginx:1.23.1-alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/hlt-frontend-angular /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]