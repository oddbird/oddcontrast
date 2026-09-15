FROM node:24@sha256:6dac556d980b7f0e5498d08f08cee0ca67798b4ad6c23964a9214920e67758d0

ARG BUILD_ENV=development
WORKDIR /app

COPY ./package.json package.json
COPY ./yarn.lock yarn.lock
# Use local version of Yarn:
COPY ./.yarnrc.yml .yarnrc.yml
RUN corepack enable
RUN yarn install --immutable

COPY . /app

# Avoid building prod assets in development
RUN if [ "${BUILD_ENV}" = "production" ] ; then yarn build ; else mkdir -p dist ; fi

CMD yarn serve
