#include <stdlib.h>
#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>
#include <time.h>
#include <omp.h>
#include "game.h"
#include "pmcs.h"

#ifndef DEBUG
#define DEBUG 0
#endif

#ifndef NUM_TRIALS
#define NUM_TRIALS 16
#endif

#ifndef NUM_THREADS
#define NUM_THREADS 2
#endif

uint8_t run_pmcs_trial() {

    uint64_t board = initBoard();
    uint64_t score = 0;
    
    while (!is_game_over(board)) {
        uint64_t last_state = board;
        char best_move = pure_monte_carlo_search(board);
        score += slide(&board, best_move);
        if (last_state != board) add_tile(&board);
    }
    return get_highest_tile(board);
}



int main(void) {

    // Check if openMP is supported and exit if not.
    #if DEBUG
        #ifdef _OPENMP
            int num_cores = omp_get_num_procs();
            int max_threads = omp_get_max_threads();
            fprintf(stderr, "OpenMP is supported --version = %d ", _OPENMP);
            fprintf(stderr, "Number of cores: %d ", num_cores);
            fprintf(stderr, "Max Number of Threads: %d\n", max_threads);
        #else
            fprintf(stderr, "No OpenMP support\n");
            return 1;
        #endif
    #endif
    
    // Set the number of threads to use in parallelizing the for-loop:
    omp_set_num_threads(NUM_THREADS);
    srand((unsigned int)time(NULL));

    uint8_t results[NUM_TRIALS];
    double start_time = omp_get_wtime();

    #pragma omp parallel for schedule(dynamic) default(none) shared(results)
    for (uint64_t i = 0; i < NUM_TRIALS; i++) {
        results[i] = run_pmcs_trial();
    }
    double end_time = omp_get_wtime();
    double performance =  (end_time - start_time) / (double)NUM_TRIALS;   
    
    #ifdef CSV
        for (int i == 0; i < NUM_TRIALS; i++) {
            fprintf(stderr, "%d,", (1 << results[i]));
        }
    #else 
        #ifdef PRINT_HEADER
            fprintf(stderr, "Threads,Trials,Time,Performance\n");
        #endif
            fprintf(stderr, "%d,", NUM_THREADS);
            fprintf(stderr, "%d,", NUM_TRIALS);
            fprintf(stderr, "%.2lf,", (end_time - start_time));
            fprintf(stderr, "%.2lf\n", performance);
    #endif

    return 0;
}