
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>
#include <unistd.h>
#include <inttypes.h>
#include "game.h"
#include "utilities.h"

typedef struct {
    char dir;
    uint64_t avg;
} MoveData;


char pure_monte_carlo_search(uint64_t board) {

    char dirs[4] = {'l', 'u', 'r', 'd'};
    MoveData valid_moves[4] = {0};
    char best_move = 0;
    uint64_t best_score = 0;

    int j = 0;
    for (int i = 0; i < 4; i++) {
        uint64_t board_copy = board;
        slide(&board_copy, dirs[i]);

        if (board_copy != board) {
            valid_moves[j].dir = dirs[i];
            j++;
        }
    }

    for (int i = 0; i < 4; i++) {
        if (valid_moves[i].dir == 0) continue;

        int num_simulations = 100;
        int max_depth = 1000;

        for (int j = 0; j < num_simulations; j++) {
            uint64_t board_copy = board;
            uint64_t score = slide(&board_copy, valid_moves[i].dir);
            int depth = 1;

            shuffle_array(
                dirs, sizeof(dirs) / sizeof(dirs[0]), sizeof(dirs[0])
            );
            int k = 0;
            while (depth < max_depth && !is_game_over(board_copy)) {
                uint64_t last_state = board_copy;
                score += slide(&board_copy, dirs[k]) / depth;
                // invalid move
                if (last_state == board_copy) {
                    k++;
                    // TODO fix error handling
                    if (k == 4) {
                        printf("\n\nError: is_game_over failed, k == 4\n");
                        exit(1);
                    }
                } else {
                    add_tile(&board_copy);
                    depth++;
                    k = 0;
                    shuffle_array(
                        dirs, sizeof(dirs) / sizeof(dirs[0]), sizeof(dirs[0])
                    );
                }
            }
            valid_moves[i].avg += score;
        }
        valid_moves[i].avg /= num_simulations;
        if (!best_move || valid_moves[i].avg > best_score) {
            best_move = valid_moves[i].dir;
            best_score = valid_moves[i].avg;
        }
    }   
    return best_move;
}


#ifdef COMPILE_AS_EXECUTABLE
int main() {
    uint64_t board = initBoard();
    uint64_t score = 0;
    clock_t start = clock();

    while (!is_game_over(board)) {
        uint64_t last_state = board;
        char best_move = pure_monte_carlo_search(board);
        //sleep(1);
        score += slide(&board, best_move);
        if (last_state != board) add_tile(&board);
    }
    clock_t end = clock();
    printf("Elapsed time: %.6f seconds\n", (double)(end - start) / CLOCKS_PER_SEC);
    printf("GAME OVER\n");
    printf("Board: %" PRIu64 "\n", board);
    print_board(board, score);

    return 0;
}
#endif