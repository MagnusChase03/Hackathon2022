#!/bin/sh

mongod &

mongosh --eval "var MONGO_INITDB_ROOT_PASSWORD='$MONGO_INITDB_ROOT_PASSWORD'" -f init.js

pkill -9 mongod

exec "$@"
