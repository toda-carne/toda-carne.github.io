#!/bin/bash

CURR_DIR=$(pwd)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "GENERATING nav3 and text3 "${BASH_SOURCE[0]}

cd $SCRIPT_DIR

SRC_DIR=${1}
BOOK_NAM=${2}

NAV2_FILE=${SRC_DIR}/nav2_${BOOK_NAM}.mustache
TXT2_FILE=${SRC_DIR}/text2_${BOOK_NAM}.mustache

NAV3_FILE=${SRC_DIR}/nav3_${BOOK_NAM}.mustache
TXT3_FILE=${SRC_DIR}/text3_${BOOK_NAM}.mustache

cp ${NAV2_FILE} ${NAV3_FILE}
cp ${TXT2_FILE} ${TXT3_FILE}

# NAV

sed -i -E 's/(href="#[^."]*)\.([^"]*")/\1_DOT_\2/g' ${NAV3_FILE}
sed -i -E 's/(id="[^."]*)\.([^"]*")/\1_DOT_\2/g' ${NAV3_FILE}
sed -i -E 's/(onclick="nav_clk_[^."]*)\.([^"]*")/\1_DOT_\2/g' ${NAV3_FILE}

sed -i -E 's/(href="#[^."]*)\.([^"]*")/\1_DOT_\2/g' ${NAV3_FILE}
sed -i -E 's/(id="[^."]*)\.([^"]*")/\1_DOT_\2/g' ${NAV3_FILE}
sed -i -E 's/(onclick="nav_clk_[^."]*)\.([^"]*")/\1_DOT_\2/g' ${NAV3_FILE}

# TEXT

sed -i -E 's/(href="#[^."]*)\.([^"]*")/\1_DOT_\2/g' ${TXT3_FILE}
sed -i -E 's/(id="[^."]*)\.([^"]*")/\1_DOT_\2/g' ${TXT3_FILE}

sed -i -E 's/(href="#[^."]*)\.([^"]*")/\1_DOT_\2/g' ${TXT3_FILE}
sed -i -E 's/(id="[^."]*)\.([^"]*")/\1_DOT_\2/g' ${TXT3_FILE}

cd ${CURR_DIR}
