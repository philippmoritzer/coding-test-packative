FROM node:22-alpine AS builder


WORKDIR /app
COPY package*.json ./

# use npm ci in prod
RUN npm install 

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "dist/main"]