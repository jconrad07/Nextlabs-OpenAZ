#!/bin/bash
shopt -s nullglob
export CURRENT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

echo Running npm install
(cd "$CURRENT_DIR"; npm install)

for f in "$CURRENT_DIR/"*.js
do
  filename=$(basename "$f")
  echo Executing Node code: $filename
  node "$f"
done
