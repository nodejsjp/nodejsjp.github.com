#!/bin/sh

./node_modules/.bin/rimraf build
git clone -b gh-pages https://github.com/kt3k/asdfghjs.jp.git build
npm run build
cd build
git add .
git commit -m 'chore(site): update build'
git push origin HEAD
