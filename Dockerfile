FROM node:lts-alpine3.9
WORKDIR /app
COPY . .
RUN npm ci
EXPOSE 3262
CMD ["node",  "main.js"]
