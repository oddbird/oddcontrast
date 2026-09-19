FROM node:24@sha256:22553920add6fb1fd909104346924cd30b4b3ac76ca2980f3b8dba8ede3cf945

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
