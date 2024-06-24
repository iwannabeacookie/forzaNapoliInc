#!/bin/bash

cd ./frontend
node ./.output/server/index.mjs

cd ../backend
npm run prod &
