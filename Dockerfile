# Stage 0 - Build Frontend Assets
FROM node:12.16.1-alpine as build

WORKDIR /react
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 1 - Serve Frontend Assets
FROM nginx

WORKDIR /etc/nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -r /usr/share/nginx/html

COPY --from=build /react/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]