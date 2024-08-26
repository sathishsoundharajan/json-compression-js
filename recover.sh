#!/bin/bash
# https://stackoverflow.com/questions/5788037/recover-from-losing-uncommitted-changes-by-git-reset-hard

cd /<other>
FILES=*
COUNTER=0

for f in $FILES
do
  echo "Processing $f file..."
  git show $f > "recover-folder/$COUNTER.m"
  COUNTER=$((COUNTER + 1))
done
