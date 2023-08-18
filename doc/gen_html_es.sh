
ODT_SRC=./SRC/TODA_CARNE_EBOOK.odt
WEB_DIR=web

pandoc -f odt -t html -o $WEB_DIR/todacarne.html $ODT_SRC --toc -s --toc-depth=6 --metadata title="Toda Carne"
tag=nav
sed -n "/<$tag/,/<\/$tag>/p" $WEB_DIR/todacarne.html > $WEB_DIR/TC_tmp_nav
pup -f $WEB_DIR/TC_tmp_nav > $WEB_DIR/nav_todacarne.mustache
rm $WEB_DIR/TC_tmp_nav
sed -i 's/<head>/<head>\n\t<meta charset="utf-8">/' $WEB_DIR/nav_todacarne.mustache
pandoc -f odt -t html -o $WEB_DIR/text_todacarne.mustache $ODT_SRC

