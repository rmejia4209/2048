
#include <stdlib.h>
#include <inttypes.h>
#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <stddef.h>


void shuffle_array(void *array, size_t num_elements, size_t element_size) {

    char *arr = (char *)array;
    char *tmp = malloc(element_size);

    // TODO: figure out error handling
    if (!tmp) exit(1);

    for (size_t i = num_elements - 1; i > 0; i--) {
        size_t j = rand() % (i + 1);

        memcpy(tmp, arr + i * element_size, element_size);
        memcpy(arr + i * element_size, arr + j * element_size, element_size);
        memcpy(arr + j * element_size, tmp, element_size);
    }
    free(tmp);
}

uint64_t convert_hex_string_to_big_int(const char *hex_str) {
    uint64_t val = 0;
    sscanf(hex_str, "%" SCNx64, &val);
    return val;
}