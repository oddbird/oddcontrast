FROM node:18

ARG BUILD_ENV=development
WORKDIR /app

COPY ./package.json package.json
COPY ./yarn.lock yarn.lock
# Use local version of Yarn:
COPY ./.yarnrc.yml .yarnrc.yml
COPY ./.yarn/releases .yarn/releases
RUN yarn install --immutable

COPY . /app

# Avoid building prod assets in development
RUN if [ "${BUILD_ENV}" = "production" ] ; then yarn build ; else mkdir -p dist ; fi

CMD yarn serve
