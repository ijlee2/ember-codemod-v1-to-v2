#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix all test fixtures after updating the source code of ember-codemod-v1-to-v2. 
#
#  B. Usage
#
#    ./codemod-test-fixtures.sh
#
#---------

./codemod-test-fixture.sh -a "packages/ember-container-query" -t "demo-app" -T "demo-app-for-ember-container-query" ember-container-query-customizations
./codemod-test-fixture.sh ember-container-query-javascript
./codemod-test-fixture.sh ember-container-query-typescript
./codemod-test-fixture.sh -a "packages/new-v1-addon" -t "demo-app" -T "demo-app-for-new-v1-addon" new-v1-addon-customizations
./codemod-test-fixture.sh new-v1-addon-javascript
./codemod-test-fixture.sh new-v1-addon-npm
./codemod-test-fixture.sh new-v1-addon-pnpm
./codemod-test-fixture.sh new-v1-addon-typescript
