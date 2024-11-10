#!/bin/bash

CURR_DIR=$(pwd)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Updating" $(basename $SCRIPT_DIR)

cd $SCRIPT_DIR

DEST_DIR=../../es/
CONF_DIR=../all_mustache/

mustach $CONF_DIR/config_exam.json language.mustache > $DEST_DIR/language.html
mustach $CONF_DIR/config_exam.json module_creator_resu.mustache > $DEST_DIR/module_creator_resu.html

cd $CURR_DIR

