#!/bin/bash

cd ./frontend
npm install
npm run build
ls -la

cd ../backend
npm install
