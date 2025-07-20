


#ifndef GAME_H
#define GAME_H

#include <stdint.h>
#include <stdbool.h>



void add_tile(uint64_t *board);
uint64_t initBoard();
bool is_game_over(const uint64_t board);
uint64_t slide(uint64_t *board, const char dir);
void print_board(uint64_t board, uint64_t score);

#endif