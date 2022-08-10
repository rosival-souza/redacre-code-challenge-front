# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder"
FROM node:16 as builder

ARG AMBIENTE
ENV AMBIENTE=${AMBIENTE}

# Set working directory
WORKDIR /app

# Copy all files from current directory to working dir in image
COPY . .

# install node modules and build assets
RUN npm install --loglevel verbose 
RUN npm run build

# nginx state for serving content
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /app/build .
COPY --from=builder /app/src/run_app.sh /usr/tools/run_app.sh
COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
