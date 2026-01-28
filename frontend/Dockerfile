# Use the Official Node.js 18 image as the base image
#FROM node:lts-alpine3.23 AS development

# ---------- Build Stage ----------
FROM node:lts-alpine AS build

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:alpine

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to Nginx html directory
COPY --from=build /frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

