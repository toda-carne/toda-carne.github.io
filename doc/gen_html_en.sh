
ODT_SRC=./SRC/ALL_FLESH_EBOOK.odt
WEB_DIR=web

pandoc -f odt -t html -o $WEB_DIR/all_flesh.html $ODT_SRC --toc -s --toc-depth=6 --metadata title="All Flesh"
tag=nav
sed -n "/<$tag/,/<\/$tag>/p" $WEB_DIR/all_flesh.html > $WEB_DIR/AF_tmp_nav
pup -f $WEB_DIR/AF_tmp_nav > $WEB_DIR/nav_all_flesh.mustache
rm $WEB_DIR/AF_tmp_nav
sed -i 's/<head>/<head>\n\t<meta charset="utf-8">/' $WEB_DIR/nav_all_flesh.mustache
pandoc -f odt -t html -o $WEB_DIR/text_all_flesh.mustache $ODT_SRC

