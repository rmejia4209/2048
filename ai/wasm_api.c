
#include <inttypes.h>
#include <stdio.h>
#include <stdint.h>
#include <emscripten/emscripten.h>
#include "utilities.h"
#include "pmcs.h"


EMSCRIPTEN_KEEPALIVE
char pmcs_get_next_move(const char *hex_str) {
    uint64_t board = convert_hex_string_to_big_int(hex_str);
    return pure_monte_carlo_search(board);
}
