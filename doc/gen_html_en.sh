
pandoc -f odt -t html -o ALL_FLESH_BOOK.html ALL_FLESH_BOOK.odt --toc -s --toc-depth=6 --metadata title="All Flesh"
tag=nav
sed -n "/<$tag/,/<\/$tag>/p" ALL_FLESH_BOOK.html > AF_tmp_nav
pup -f AF_tmp_nav > AF_nav.snippet
rm AF_tmp_nav
sed -i 's/<head>/<head>\n\t<meta charset="utf-8">/' AF_nav.snippet
pandoc -f odt -t html -o AF_content.snippet ALL_FLESH_BOOK.odt

