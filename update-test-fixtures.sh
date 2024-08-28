#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix all test fixtures after updating the source code.
#
#  B. Usage
#
#    ./update-test-fixtures.sh
#
#---------

# Compile TypeScript
pnpm build

# Update fixtures
rm -r "tests/fixtures/ember-container-query-customizations/output"
cp -r "tests/fixtures/ember-container-query-customizations/input" "tests/fixtures/ember-container-query-customizations/output"

./dist/bin/ember-codemod-v1-to-v2.js \
  --addon-location packages/ember-container-query \
  --root "tests/fixtures/ember-container-query-customizations/output" \
  --test-app-location demo-app \
  --test-app-name demo-app-for-ember-container-query

# Update fixtures
rm -r "tests/fixtures/ember-container-query-glint/output"
cp -r "tests/fixtures/ember-container-query-glint/input" "tests/fixtures/ember-container-query-glint/output"

./dist/bin/ember-codemod-v1-to-v2.js \
  --root "tests/fixtures/ember-container-query-glint/output"

# Update fixtures
rm -r "tests/fixtures/ember-container-query-javascript/output"
cp -r "tests/fixtures/ember-container-query-javascript/input" "tests/fixtures/ember-container-query-javascript/output"

./dist/bin/ember-codemod-v1-to-v2.js \
  --root "tests/fixtures/ember-container-query-javascript/output"

# Update fixtures
rm -r "tests/fixtures/ember-container-query-scoped/output"
cp -r "tests/fixtures/ember-container-query-scoped/input" "tests/fixtures/ember-container-query-scoped/output"

./dist/bin/ember-codemod-v1-to-v2.js \
  --root "tests/fixtures/ember-container-query-scoped/output"

# Update fixtures
rm -r "tests/fixtures/ember-container-query-typescript/output"
cp -r "tests/fixtures/ember-container-query-typescript/input" "tests/fixtures/ember-container-query-typescript/output"

./dist/bin/ember-codemod-v1-to-v2.js \
  --root "tests/fixtures/ember-container-query-typescript/output"

# Update fixtures
rm -r "tests/fixtures/new-v1-addon-customizations/output"
cp -r "tests/fixtures/new-v1-addon-customizations/input" "tests/fixtures/new-v1-addon-customizations/output"

./dist/bin/ember-codemod-v1-to-v2.js \
  --addon-location packages/new-v1-addon \
  --root "tests/fixtures/new-v1-addon-customizations/output" \
  --test-app-location demo-app \
  --test-app-name demo-app-for-new-v1-addon

# Update fixtures
rm -r "tests/fixtures/new-v1-addon-javascript/output"
cp -r "tests/fixtures/new-v1-addon-javascript/input" "tests/fixtures/new-v1-addon-javascript/output"

./dist/bin/ember-codemod-v1-to-v2.js \
  --root "tests/fixtures/new-v1-addon-javascript/output"

# Update fixtures
rm -r "tests/fixtures/new-v1-addon-npm/output"
cp -r "tests/fixtures/new-v1-addon-npm/input" "tests/fixtures/new-v1-addon-npm/output"

./dist/bin/ember-codemod-v1-to-v2.js \
  --root "tests/fixtures/new-v1-addon-npm/output"

# Update fixtures
rm -r "tests/fixtures/new-v1-addon-pnpm/output"
cp -r "tests/fixtures/new-v1-addon-pnpm/input" "tests/fixtures/new-v1-addon-pnpm/output"

./dist/bin/ember-codemod-v1-to-v2.js \
  --root "tests/fixtures/new-v1-addon-pnpm/output"

# Update fixtures
rm -r "tests/fixtures/new-v1-addon-typescript/output"
cp -r "tests/fixtures/new-v1-addon-typescript/input" "tests/fixtures/new-v1-addon-typescript/output"

./dist/bin/ember-codemod-v1-to-v2.js \
  --root "tests/fixtures/new-v1-addon-typescript/output"
