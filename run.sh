#!/bin/bash

cd ./frontend
node ./server/index.mjs

cd ../backend
npm run prod &
