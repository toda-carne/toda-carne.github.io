pandoc -f odt -t markdown -o $1.md $1
sed -i 's/\[\]{#anchor-[[:digit:]]*}//g' $1.md
sed -i 's/^### /\nINICIO_SCRIPT\n### /' $1.md
mkdir scripts
mv $1.md scripts
cd scripts
csplit -z $1.md '/INICIO_SCRIPT/' '{*}'


