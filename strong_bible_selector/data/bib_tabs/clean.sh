#!/bin/bash

CURR_DIR=$(pwd)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "clean ${1} using "${BASH_SOURCE[0]}

cd $SCRIPT_DIR

rm *_bib.tab

echo "Finished clean ----------------------------- "

cd ${CURR_DIR}