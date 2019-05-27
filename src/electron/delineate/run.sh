#!/bin/bash

if [[ $# -lt 2 ]]; then
  echo "Usage: run.sh <input_file> <output_file>"
  exit 1
fi

java -jar ./delineate/wdk-delineate.jar $1 $2
