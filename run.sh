#!/bin/bash

cd ./frontend
NITRO_PORT=10000 node ./.output/server/index.mjs &
echo "Running script"

cd ../backend
npm run prod &
