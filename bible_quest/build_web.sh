#!/bin/bash

CURR_DIR=$(pwd)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Building web for " $(basename $SCRIPT_DIR)

cd $SCRIPT_DIR
./web_src/en_mustache/gen_pages.sh
./web_src/es_mustache/gen_pages.sh
cd $CURR_DIR


