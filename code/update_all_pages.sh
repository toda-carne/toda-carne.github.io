#!/bin/bash

CURR_DIR=$(pwd)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Updating all pages" $(basename $SCRIPT_DIR)

cd $SCRIPT_DIR
../website_src/en_mustache/gen_pages.sh
../website_src/es_mustache/gen_pages.sh
cd $CURR_DIR
