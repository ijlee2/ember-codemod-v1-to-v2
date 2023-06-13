#!/usr/bin/env sh

ENVIRONMENT=$1

if [ $ENVIRONMENT == "--production" ]
then
  # Clean slate
  rm -rf "dist"

  # Compile TypeScript
  tsc --project "tsconfig.build.json"

  # Configure files
  chmod +x "dist/bin/ember-codemod-v1-to-v2.js"
  cp -r "src/blueprints" "dist/src/blueprints"

  echo "SUCCESS: Built dist.\n"

elif [ $ENVIRONMENT == "--test" ]
then
  # Clean slate
  rm -rf "dist-for-testing"

  # Compile TypeScript
  tsc --project "tsconfig.json"

  # Configure files
  cp -r "src/blueprints" "dist-for-testing/src/blueprints"

  echo "SUCCESS: Built dist-for-testing.\n"

fi
