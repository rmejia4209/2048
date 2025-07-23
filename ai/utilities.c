
#include <stdlib.h>
#include <inttypes.h>
#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <stddef.h>
#include <time.h>

#include "utilities.h"


#ifdef USE_RAND_R
#include <omp.h>
/**
 * Returns a pointer to a seed based on thread number. Use's knuth's
 * constant to better distribute the seeds.
 */
static unsigned int *get_thread_seed(void) {
    static uint32_t seeds[128];  // support for 128 threads max
    int tid = omp_get_thread_num();
    if (tid > 127) {
        fprintf(stderr, "Error: using more than 128 threads");
        exit(1);
    }

    if (seeds[tid] == 0) {
        seeds[tid] = (uint32_t)(time(NULL) ^ (tid * 2654435761u));  //here?
    }
    return &seeds[tid];
}


#endif

int random_int(int min, int max) {

    if (min > max) {
        fprintf(stderr, "Min is greater than max...");
        exit(1);
    }

    int rand_num;
    static int seeded = 0;

    #ifdef USE_RAND_R
        rand_num = rand_r(get_thread_seed());
    #else
        if (!seeded) {
            srand((unsigned int) time(NULL));
            seeded = 1;
        }
        rand_num = rand();
    #endif
        
        return min + rand_num % (max - min + 1);
}



void shuffle_array(void *array, size_t num_elements, size_t element_size) {

    char *arr = (char *)array;
    char *tmp = malloc(element_size);

    // TODO: figure out error handling
    if (!tmp) exit(1);

    for (size_t i = num_elements - 1; i > 0; i--) {
        size_t j = (size_t)random_int(0, i);

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