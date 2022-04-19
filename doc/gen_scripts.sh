pandoc -f odt -t markdown -o $1.md $1
sed -i 's/\[\]{#anchor-[[:digit:]]*}//g' $1.md
sed -i 's/^### /\nINICIO_SCRIPT\n### /' $1.md
mkdir scripts
mv $1.md scripts
cd scripts
csplit -z $1.md '/INICIO_SCRIPT/' '{*}'
ls > all_files
awk '{print "mv "$1" "$1".txt"}' all_files > rename.sh
rm all_files
bash rename.sh
rm rename.sh
mv $1.md ../$1.txt
