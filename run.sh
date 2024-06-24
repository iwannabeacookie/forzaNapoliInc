#!/bin/bash

cd ./frontend
NODE_DEBUG=cluster,net,http,fs,tls,module,timers NITRO_PORT=10000 node ./.output/server/index.mjs &
echo "Running script"

cd ../backend
NODE_DEBUG=cluster,net,http,fs,tls,module,timers node ./server.js &
