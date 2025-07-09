#!/bin/bash

CURR_DIR=$(pwd)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Updating" $(basename $SCRIPT_DIR)

cd $SCRIPT_DIR

./en_mustache/gen_pages.sh
./es_mustache/gen_pages.sh

cd $CURR_DIR

