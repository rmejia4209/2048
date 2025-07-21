


# === Variables ===
# C
CC = gcc
CFLAGS = -Wall -Wextra -g
EXE_SRC = pmcs.c game.c utilities.c
BIN_DIR = ./bin
NATIVE_OUT = $(BIN_DIR)/pmcs

# WASM
EMCC = emcc
SRC = game.c utilities.c pmcs.c wasm_api.c
WEB_OUT_DIR = ../src/ai/bin
WASM_OUT = $(WEB_OUT_DIR)/wasm_api.js


# === Targets ===
.PHONY: all clean web_test build_pmcs add_bin_to_path

all: web_test build_pmcs

# WASM
web_dev: | $(WEB_OUT_DIR)
	$(EMCC) $(SRC) \
		-s EXPORT_ES6=1 \
		-s EXPORTED_RUNTIME_METHODS='["lengthBytesUTF8", "stringToUTF8", "UTF8ToString"]' \
		-s EXPORTED_FUNCTIONS='["_malloc", "_free"]' \
		-o $(WASM_OUT)

web_prod: | $(WEB_OUT_DIR)
	$(EMCC) $(SRC) \
		-s EXPORT_ES6=1 -O3 \
		-s EXPORTED_RUNTIME_METHODS='["lengthBytesUTF8", "stringToUTF8", "UTF8ToString"]' \
		-s EXPORTED_FUNCTIONS='["_malloc", "_free"]' \
		-o $(WASM_OUT)


$(WEB_OUT_DIR):
	mkdir -p $(WEB_OUT_DIR)


# C
build_pmcs: | $(BIN_DIR)
	$(CC) $(CFLAGS) -DCOMPILE_AS_EXECUTABLE $(EXE_SRC) -o $(NATIVE_OUT)

$(BIN_DIR):
	mkdir -p $(BIN_DIR)


clean:
	rm -rf $(BIN_DIR) $(WEB_OUT_DIR)



