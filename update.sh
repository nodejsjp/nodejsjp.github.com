#!/bin/sh

./node_modules/.bin/rimraf build
git clone -b master https://github.com/nodejsjp/nodejsjp.github.com.git build
npm run build
cd build
git add .
git commit -m 'chore(site): automated update from circleci'
git push origin HEAD
