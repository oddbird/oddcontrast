FROM node:26@sha256:f8e5d4bb28fa55c74f1345166a082a10b7c68f22304350c1ce0d18358ae94996

ARG BUILD_ENV=development
WORKDIR /app

COPY ./package.json package.json
COPY ./yarn.lock yarn.lock
# Use local version of Yarn:
COPY ./.yarnrc.yml .yarnrc.yml
RUN npm install -g corepack
RUN corepack enable
RUN yarn install --immutable

COPY . /app

# Avoid building prod assets in development
RUN if [ "${BUILD_ENV}" = "production" ] ; then yarn build ; else mkdir -p dist ; fi

CMD yarn serve
