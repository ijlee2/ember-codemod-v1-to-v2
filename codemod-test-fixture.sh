#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix the expected output of a test fixture after updating the source code
#    of ember-codemod-v1-to-v2. 
#
#  B. Usage
#
#    ./codemod-test-fixture.sh [OPTIONAL-FLAGS] <FIXTURE-NAME>
#
#    Step 1. Run the script to update the files in `tests/fixtures/<FIXTURE-NAME>/output`.
#
#      Choice a. Run the codemod without the optional arguments.
#
#        ./codemod-test-fixture.sh ember-container-query-glint
#
#      Choice b. Run the codemod with the optional arguments. (For named arguments,
#      do not include `=` between the flag and the value. Positional arguments must
#      appear at the end.)
#
#        ./codemod-test-fixture.sh -a "packages/ember-container-query" ember-container-query-customizations
#
#---------

# Read the named arguments
while getopts ":a:t:T:" flag
do
  case $flag in
    a) ADDON_LOCATION=$OPTARG;;
    t) TEST_APP_LOCATION=$OPTARG;;
    T) TEST_APP_NAME=$OPTARG;;
  esac
done

# Read the positional arguments
FIXTURE=${@:$OPTIND:1}

if [ ! $FIXTURE ]
then
  echo "ERROR: Please specify the fixture name (e.g. ember-container-query-glint).\n"
  exit 1
elif [ ! -d "tests/fixtures/$FIXTURE/input" ]
then
  echo "ERROR: Input folder \`tests/fixtures/$FIXTURE/input\` does not exist.\n"
  exit 1
fi

rm -r "tests/fixtures/$FIXTURE/output"
cp -r "tests/fixtures/$FIXTURE/input" "tests/fixtures/$FIXTURE/output"

./dist/bin/ember-codemod-v1-to-v2.js \
  --addon-location=$ADDON_LOCATION \
  --root="tests/fixtures/$FIXTURE/output" \
  --test-app-location=$TEST_APP_LOCATION \
  --test-app-name=$TEST_APP_NAME

echo "SUCCESS: Updated the output of $FIXTURE.\n"
