# Use an official Node.js image
FROM node:24-alpine AS base

# Dates will only return UTC unless this is installed
RUN apk add --no-cache tzdata

ENV TZ=Europe/Berlin

# Set working directory
WORKDIR /app

RUN corepack enable yarn

# Copy dependency definitions
COPY package.json .yarnrc.yml yarn.lock ./

# Install dependencies with Yarn
RUN yarn install --immutable

COPY . .
# ------------------------------------------------------------------------------
# Target: dev
# ------------------------------------------------------------------------------

FROM base AS dev

WORKDIR /app

# Start Next.js in dev mode
CMD ["yarn", "dev"]

# ------------------------------------------------------------------------------
# Target: prod
# ------------------------------------------------------------------------------

FROM base AS prod

WORKDIR /app

RUN yarn next build --experimental-build-mode=compile

RUN chown -R 1000:1000 /app
USER 1000:1000

CMD ["yarn", "start"]