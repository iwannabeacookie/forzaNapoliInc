#!/bin/bash

cd ./frontend
ls -la
NITRO_PORT=10000 node ./.output/server/index.mjs &

cd ../backend
npm run prod &
