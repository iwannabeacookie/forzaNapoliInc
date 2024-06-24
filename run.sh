#!/bin/bash

cd ./frontend
npm run preview &

cd ../backend
npm run prod &
