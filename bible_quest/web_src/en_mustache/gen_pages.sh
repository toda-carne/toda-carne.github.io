#!/bin/bash

CURR_DIR=$(pwd)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Updating" $(basename $SCRIPT_DIR)

cd $SCRIPT_DIR

SRC_DIR=.
DEST_DIR=../../en/
CONF_DIR=../all_mustache/
CONF_FILE=$CONF_DIR/config_exam.json

mustach $CONF_FILE $SRC_DIR/language.mustache > $DEST_DIR/language.html
mustach $CONF_FILE $SRC_DIR/module_creator_resu.mustache > $DEST_DIR/module_creator_resu.html
mustach $CONF_FILE $SRC_DIR/module_old_resu.mustache > $DEST_DIR/module_old_resu.html

cd $CURR_DIR

