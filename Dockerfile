FROM node:16

ARG BUILD_ENV=development
WORKDIR /app

COPY ./package.json package.json
COPY ./yarn.lock yarn.lock
RUN yarn install --check-files

COPY . /app

# Avoid building prod assets in development
RUN if [ "${BUILD_ENV}" = "production" ] ; then yarn build ; else mkdir -p dist ; fi

CMD yarn serve
