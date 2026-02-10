
# the standard shell for make

BASE_DIR = $(shell pwd)

ODT_DIR = $(BASE_DIR)/SRC
DEST_DIR = $(BASE_DIR)
GEN_HTM_DIR = $(BASE_DIR)/gen_htm
GEN_NAVJS_DIR = $(BASE_DIR)/fix_openoffice_navs
ADD_REFS_DIR = $(BASE_DIR)/add_refs
FIX_REFS_DIR = $(BASE_DIR)/fix_refs


BASH=bash

HTM_FILES = \
$(DEST_DIR)/todacarne.html $(DEST_DIR)/text1_todacarne.mustache $(DEST_DIR)/nav1_todacarne.mustache \
$(DEST_DIR)/all_flesh.html $(DEST_DIR)/text1_all_flesh.mustache $(DEST_DIR)/nav1_all_flesh.mustache

NAV_JS_FILES = \
$(DEST_DIR)/nav2_todacarne_js.mustache \
$(DEST_DIR)/nav2_all_flesh_js.mustache

FINAL_FILES = \
$(DEST_DIR)/nav3_todacarne.mustache $(DEST_DIR)/text3_todacarne.mustache \
$(DEST_DIR)/nav3_all_flesh.mustache $(DEST_DIR)/text3_all_flesh.mustache

# Suppresses display of executed commands
# $(VERBOSE).SILENT:

default_rule: $(FINAL_FILES)
	@echo "Finished building all web files."

	
#---------------------------------------------------------
# clean rule
#

#clean: 
#	rm -f $(BIN_DIR)/$(EXE_NAM) $(ALL_OBJS)


#full: clean $(BIN_DIR)/$(EXE_NAM)
#	@echo "Finished full build of "$(EXE_NAM)"."


# Rules to build .o files from their sources:


#---------------------------------------------------------
# GENERATING RULES
#

#-----
# BASE HTM

$(DEST_DIR)/todacarne.html $(DEST_DIR)/text1_todacarne.mustache $(DEST_DIR)/nav1_todacarne.mustache : \
	$(ODT_DIR)/TODA_CARNE_EBOOK.odt
	$(BASH) $(GEN_HTM_DIR)/gen_html_sh $(ODT_DIR)/TODA_CARNE_EBOOK.odt $(DEST_DIR) todacarne 'Toda Carne'


$(DEST_DIR)/all_flesh.html $(DEST_DIR)/text1_all_flesh.mustache $(DEST_DIR)/nav1_all_flesh.mustache : \
	$(ODT_DIR)/ALL_FLESH_EBOOK.odt
	$(BASH) $(GEN_HTM_DIR)/gen_html_sh $(ODT_DIR)/ALL_FLESH_EBOOK.odt $(DEST_DIR) 'all_flesh' 'All Flesh'

#-----
# NAV2

$(DEST_DIR)/nav2_todacarne.mustache : $(DEST_DIR)/nav1_todacarne.mustache
	$(BASH) $(GEN_NAVJS_DIR)/gen_nav_js_sh $(DEST_DIR) 'todacarne' es

$(DEST_DIR)/nav2_all_flesh.mustache : $(DEST_DIR)/nav1_all_flesh.mustache
	$(BASH) $(GEN_NAVJS_DIR)/gen_nav_js_sh $(DEST_DIR) 'all_flesh' en


#-----
# TXT2

$(DEST_DIR)/text2_todacarne.mustache : $(DEST_DIR)/text1_todacarne.mustache
	$(BASH) $(ADD_REFS_DIR)/add_refs_sh $(DEST_DIR) 'todacarne' es

$(DEST_DIR)/text2_all_flesh.mustache : $(DEST_DIR)/text1_all_flesh.mustache
	$(BASH) $(ADD_REFS_DIR)/add_refs_sh $(DEST_DIR) 'all_flesh' en


#-----
# FILES3

$(DEST_DIR)/text3_todacarne.mustache $(DEST_DIR)/nav3_todacarne.mustache : \
		$(DEST_DIR)/text2_todacarne.mustache $(DEST_DIR)/nav2_todacarne.mustache
	$(BASH) $(FIX_REFS_DIR)/fix_dot_refs.sh $(DEST_DIR) 'todacarne'

$(DEST_DIR)/text3_all_flesh.mustache $(DEST_DIR)/nav3_all_flesh.mustache : \
		$(DEST_DIR)/text2_all_flesh.mustache $(DEST_DIR)/nav2_all_flesh.mustache
	$(BASH) $(FIX_REFS_DIR)/fix_dot_refs.sh $(DEST_DIR) 'all_flesh'




