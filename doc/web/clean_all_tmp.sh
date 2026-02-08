#!/bin/bash

CURR_DIR=$(pwd)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "clean ${1} using "${BASH_SOURCE[0]}

cd $SCRIPT_DIR

rm ./Makefile
rm ./todacarne.html
rm ./all_flesh.html
rm ./nav*
rm ./text*
rm ./add_refs/content 
rm ./add_refs/footnotes 
rm ./add_refs/bib_index 
rm ./add_refs/sebib_footnotes

echo "Finished clean ----------------------------- "

cd ${CURR_DIR}