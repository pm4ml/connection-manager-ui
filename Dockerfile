FROM node:lts-alpine
# First part, build the app
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn install

COPY ./ /app/

# Specifies the api base URL
ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL

# Adds the package version and commit hash
ARG REACT_APP_VERSION
ENV REACT_APP_VERSION=$REACT_APP_VERSION

# Exposes the commit in the build
ARG REACT_APP_COMMIT
ENV REACT_APP_COMMIT=$REACT_APP_COMMIT

RUN yarn run build



# Second part, copy the build and server the app using a node express server

RUN cp -r /app/build /app/server/

WORKDIR /app/server
RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]
