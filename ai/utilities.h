
#ifndef UTILITIES_H
#define UTILITIES_H

#include <stdint.h>
#include <stddef.h>

// exposed functions
void shuffle_array(void *array, size_t num_elements, size_t element_size);
uint64_t convert_hex_string_to_big_int(const char *hex_str);

#endif