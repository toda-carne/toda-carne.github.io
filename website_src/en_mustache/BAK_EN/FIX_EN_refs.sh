
NAV_FILE=nav_all_flesh.mustache
TXT_FILE=text_all_flesh.mustache

cp nav_en_orig $NAV_FILE
cp text_en_orig $TXT_FILE

# NAV

sed -i -E 's/(href="#[^."]*)\.([^"]*")/\1_DOT_\2/g' $NAV_FILE
sed -i -E 's/(id="[^."]*)\.([^"]*")/\1_DOT_\2/g' $NAV_FILE
sed -i -E 's/(onclick="nav_clk_[^."]*)\.([^"]*")/\1_DOT_\2/g' $NAV_FILE

sed -i -E 's/(href="#[^."]*)\.([^"]*")/\1_DOT_\2/g' $NAV_FILE
sed -i -E 's/(id="[^."]*)\.([^"]*")/\1_DOT_\2/g' $NAV_FILE
sed -i -E 's/(onclick="nav_clk_[^."]*)\.([^"]*")/\1_DOT_\2/g' $NAV_FILE

# TEXT

sed -i -E 's/(href="#[^."]*)\.([^"]*")/\1_DOT_\2/g' $TXT_FILE
sed -i -E 's/(id="[^."]*)\.([^"]*")/\1_DOT_\2/g' $TXT_FILE

sed -i -E 's/(href="#[^."]*)\.([^"]*")/\1_DOT_\2/g' $TXT_FILE
sed -i -E 's/(id="[^."]*)\.([^"]*")/\1_DOT_\2/g' $TXT_FILE

