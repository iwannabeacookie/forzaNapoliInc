#!/bin/bash

cd ./frontend
ls -la
node ./.output/server/index.mjs

cd ../backend
npm run prod &
