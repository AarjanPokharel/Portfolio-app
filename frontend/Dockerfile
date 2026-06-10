FROM node:lts-alpine3.23

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# Build the Next.js app for production
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
