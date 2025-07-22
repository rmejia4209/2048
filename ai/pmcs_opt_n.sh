#!/bin/bash

# prints data on number of threads, number of trials, and highest tile
print_header=1
score_analytics="./data/pmcs_scores.csv"
thread_analytics="./data/pmcs_opt_t.csv"

mkdir -p data
[ -f $thread_analytics ] && rm $thread_analytics
for t in 1 2 4 8 16 32 64
do
    for n in 64 128 256
    do
        gcc -O3 -lm -fopenmp -DPRINT_HEADER=$print_header -DUSE_RAND_R \
            -DCSV -DNUM_TRIALS=$n -DNUM_THREADS=$t \
            pmcs_analytics.c game.c pmcs.c utilities.c -o ./bin/pmcs_analytics

        ./bin/pmcs_analytics >> $score_analytics 2>> $thread_analytics
        echo "Finished $n trials with $t threads"
        # Turn off headers after one iteration
        if [ $print_header == 1 ]; then
            print_header=0 # is this right?
        fi
    done
done