#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Copy an existing project to tests/fixtures.
#
#  B. Usage
#
#    ./create-test-fixture.sh <PATH-TO-SOURCE> <FIXTURE-NAME> [CREATE-EMPTY-FILES]
#
#    Step 1. Ensure that the project is available on your local machine.
#
#      cd ~/Desktop
#      git clone git@github.com:ijlee2/ember-container-query.git
#
#    Step 2. Run the script to copy the files to `tests/fixtures/<FIXTURE-NAME>`.
#
#      Choice a. Keep most of the source code.
#
#        ./create-test-fixture.sh "../../Desktop/ember-container-query/docs-app" ember-container-query
#
#      Choice b. Empty every file.
#
#        ./create-test-fixture.sh "../../Desktop/ember-container-query/docs-app" ember-container-query true
#
#---------

SOURCE=$1
DESTINATION=$2
CREATE_EMPTY_FILES=$3

if [ ! -d $SOURCE ]
then
  echo "ERROR: Source \`$SOURCE\` does not exist.\n"
  exit 1
fi

if [ ! $DESTINATION ]
then
  echo "ERROR: Please specify the destination (i.e. the fixture name).\n"
  exit 1
elif [ -d "tests/fixtures/$DESTINATION" ]
then
  echo "WARNING: Test fixture already exists. Removing it now.\n"
  rm -r "tests/fixtures/$DESTINATION"
fi


mkdir -p "tests/fixtures/$DESTINATION/input"
mkdir -p "tests/fixtures/$DESTINATION/output"

echo "import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('$DESTINATION/input');
const outputProject = convertFixtureToJson('$DESTINATION/output');

export { inputProject, outputProject };" \
  > "tests/fixtures/$DESTINATION/index.ts"

echo "SUCCESS: Scaffolded the input and output folders.\n"


rsync \
  --exclude=".git" \
  --exclude="dist" \
  --exclude="node_modules" \
  --quiet \
  --recursive \
  "$SOURCE/" \
  "tests/fixtures/$DESTINATION/input"

rsync \
  --exclude=".git" \
  --exclude="dist" \
  --exclude="node_modules" \
  --quiet \
  --recursive \
  "$SOURCE/" \
  "tests/fixtures/$DESTINATION/output"

echo "SUCCESS: Copied the source code to destination.\n"


if [ $CREATE_EMPTY_FILES ]
then
  find "tests/fixtures/$DESTINATION/input" -type f -exec truncate -s 0 {} \;
  find "tests/fixtures/$DESTINATION/output" -type f -exec truncate -s 0 {} \;

  echo "SUCCESS: Emptied all files.\n"
else
  for file in {package-lock.json,pnpm-lock.yaml,yarn.lock}
  do
    if [ -f "tests/fixtures/$DESTINATION/input/$file" ]
    then
      truncate -s 0 "tests/fixtures/$DESTINATION/input/$file"
    fi

    if [ -f "tests/fixtures/$DESTINATION/output/$file" ]
    then
      truncate -s 0 "tests/fixtures/$DESTINATION/output/$file"
    fi
  done

  echo "SUCCESS: Emptied select files.\n"  
fi
