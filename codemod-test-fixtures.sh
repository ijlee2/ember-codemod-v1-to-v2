#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix all test fixtures after updating the source code.
#
#  B. Usage
#
#    ./codemod-test-fixtures.sh
#
#---------

# Compile TypeScript
pnpm build

./codemod-test-fixture.sh \
  -a "--addon-location packages/ember-container-query --test-app-location demo-app --test-app-name demo-app-for-ember-container-query" \
  ember-container-query-customizations

./codemod-test-fixture.sh \
  ember-container-query-glint

./codemod-test-fixture.sh \
  ember-container-query-javascript

./codemod-test-fixture.sh \
  ember-container-query-scoped

./codemod-test-fixture.sh \
  ember-container-query-typescript

./codemod-test-fixture.sh \
  -a "--addon-location packages/new-v1-addon --test-app-location demo-app --test-app-name demo-app-for-new-v1-addon" \
  new-v1-addon-customizations

./codemod-test-fixture.sh \
  new-v1-addon-javascript

./codemod-test-fixture.sh \
  new-v1-addon-npm

./codemod-test-fixture.sh \
  new-v1-addon-pnpm

./codemod-test-fixture.sh \
  new-v1-addon-typescript
