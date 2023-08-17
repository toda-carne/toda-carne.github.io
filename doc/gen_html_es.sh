
ODT_SRC=./SRC/TODA_CARNE_EBOOK.odt

pandoc -f odt -t html -o LIBRO_TODA_CARNE.html $ODT_SRC --toc -s --toc-depth=6 --metadata title="Toda Carne"
tag=nav
sed -n "/<$tag/,/<\/$tag>/p" LIBRO_TODA_CARNE.html > TC_tmp_nav
pup -f TC_tmp_nav > TC_nav.snippet
rm TC_tmp_nav
sed -i 's/<head>/<head>\n\t<meta charset="utf-8">/' TC_nav.snippet
pandoc -f odt -t html -o TC_content.snippet $ODT_SRC

