
DEST_DIR=../../en/

mustach config_mustache.json book.mustache > $DEST_DIR/book.html
mustach config_mustache.json schema.mustache > $DEST_DIR/schema.html
mustach config_mustache.json media.mustache > $DEST_DIR/media.html
mustach config_mustache.json download.mustache > $DEST_DIR/download.html
mustach config_mustache.json info.mustache > $DEST_DIR/info.html
mustach config_mustache.json tips.mustache > $DEST_DIR/tips.html
mustach config_mustache.json language.mustache > $DEST_DIR/language.html
mustach config_mustache.json home.mustache > $DEST_DIR/index.html