#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix the expected output of a test fixture after updating the source code.
#
#  B. Usage
#
#    For named arguments, do not include `=` between the flag and the value.
#    Positional arguments are to appear at the end.
#
#    ./codemod-test-fixture.sh [OPTIONAL-FLAGS] <FIXTURE-NAME>
#
#---------

# Read the named arguments
while getopts ":a:" flag
do
  case $flag in
    a) ARGUMENTS=$OPTARG;;
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

./dist/bin/ember-codemod-v1-to-v2.js $ARGUMENTS --root="tests/fixtures/$FIXTURE/output"

echo "SUCCESS: Updated the output of $FIXTURE.\n"
