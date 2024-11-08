#!/bin/bash

CURR_DIR=$(pwd)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Updating" $(basename $SCRIPT_DIR)

cd $SCRIPT_DIR

DEST_DIR=../../en/
CONF_DIR=../all_mustache/

mustach $CONF_DIR/config_default.json book.mustache > $DEST_DIR/book.html
mustach $CONF_DIR/config_default.json schema.mustache > $DEST_DIR/schema.html
mustach $CONF_DIR/config_default.json media.mustache > $DEST_DIR/media.html
mustach $CONF_DIR/config_default.json download.mustache > $DEST_DIR/download.html
mustach $CONF_DIR/config_default.json info.mustache > $DEST_DIR/info.html
mustach $CONF_DIR/config_default.json tips.mustache > $DEST_DIR/tips.html
mustach $CONF_DIR/config_default.json language.mustache > $DEST_DIR/language.html
mustach $CONF_DIR/config_default.json home.mustache > $DEST_DIR/index.html

cd $CURR_DIR

