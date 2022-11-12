from node:19.0.1-bullseye

run mkdir /app \
    && chown -R node:node /app

run apt update -y \
    && apt install python3 -y \
    && apt install python3-pip -y \ 
    && pip3 install numpy

# user node
workdir app

copy ./src/package.json .
run yarn install
copy ./src .

expose 3000

cmd ["node", "index.js"]

