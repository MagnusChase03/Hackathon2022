from node:19.0.0-alpine3.15

run mkdir /app \
    && chown -R node:node /app

user node
workdir app

copy ./src/package.json .
run yarn install
copy ./src .

expose 3000

cmd ["node", "index.js"]

