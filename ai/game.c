

#include "game.h"
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <time.h>
#include <stdbool.h>
#include <inttypes.h>

#define SIZE 4
#define CELL_WIDTH 7  


typedef struct
{
    int step;
    int offset_start;
    int offset_step;
} StepOffset;

/**
 * Prints the binary representation of the given value
 */
void print_binary(uint64_t value) {
    for (int i = 63; i >= 0; i--) {
        putchar((value >> i) & 1 ? '1' : '0');
        if (i % 4 == 0) putchar(' ');  // separate into nibbles
    }
    putchar('\n');
}

/**
 * Returns the number of empty tiles
 * Edits the array in place with the bit postion of the empty cell
 */
int get_empty_tiles(uint64_t *board, int empty_tiles[16]) {

    int num_empty = 0;
    int i = 0;
    for (int pos = 0; pos < 64; pos += 4) {
        int value = ((*board) >> pos) & 0xF;
        if (value == 0) {
            empty_tiles[i] = pos;
            i++;
            num_empty++;
        }
    }
    return num_empty;
}


/**
 * Sets the position of the board to 0000 and then sets it to the given
 * value
 */
void set_tile(uint64_t *board, int pos, int value) {
    *board &= ~(0xFULL << pos);
    *board |= (uint64_t)(value & 0xF) << pos;
    return;
}


/**
 * Adds a 1 or 2 to a randomly selected position on the board
 */
void add_tile(uint64_t *board) {

    int empty_tiles[16];
    int num_empty = get_empty_tiles(board, empty_tiles);
    // TODO escape if 0
    int val = rand() % 100 < 90 ? 1 : 2;
    int empty_tile_pos = (rand() % num_empty);
    set_tile(board, empty_tiles[empty_tile_pos], val);
    return;
}


/**
 * Initializes a board on a 64 bit unsigned integer
 */
uint64_t initBoard() {
    uint64_t board = 0;
    add_tile(&board);
    add_tile(&board);
    return board;
}


StepOffset get_step_offset(const char dir) {
    StepOffset step_offset;
    switch (dir)
    {
    case 'u':
        step_offset.step = -16;
        step_offset.offset_start = 60;
        step_offset.offset_step = -4;
        break;
    case 'l':
        step_offset.step = -4;
        step_offset.offset_start = 60;
        step_offset.offset_step = -16;
        break;
    case 'r':
        step_offset.step=4;
        step_offset.offset_start=0;
        step_offset.offset_step=16;
        break;
    case 'd':
        step_offset.step = 16;
        step_offset.offset_start = 0;
        step_offset.offset_step = 4;
        break;
    
    default:
        exit(1);
        break;
    }
    return step_offset;
}


bool is_in_bounds(int pos) {
    return (pos < 64 && pos >= 0) ? true : false;
}

bool is_adjacent(int row, int col, int neighbor_row, int neighbor_col) {
    return (
        (row == neighbor_row || col == neighbor_col) ? true : false
    );
}

bool is_game_over(const uint64_t board) {

    int neighbors_diffs[4] = {-16, -4, 16, 4};

    for (int row = 0; row < 4; row++) {
        for (int col = 0; col < 4; col++) {
            int pos = (4 * col) + (16 * row);

            uint8_t curr_val = (board >> pos) & 0xF;

            // If there is an empty tile, return false;
            if (curr_val == 0) return false;
            else if (curr_val == 15) return true;  //max value
            

            for (int i = 0; i < 4; i++) {
                int neighbor_pos = pos + neighbors_diffs[i];
                int neighbor_col = (neighbor_pos % 16) / 4;
                int neighbor_row = neighbor_pos / 16;
                if (
                    !is_in_bounds(neighbor_pos)
                    || !is_adjacent(row, col, neighbor_row, neighbor_col)
                ) {
                    continue;
                }
                
                // If there is a matching neighbor return false
                uint8_t neighbor_val = (board >> neighbor_pos) & 0xF;

                if (neighbor_val == curr_val) return false;
            }
            

        }
    }

    for (int pos = 0; pos < 64; pos += 4) {        
        
    }
    return true;
}


uint64_t slide(uint64_t *board, const char dir) {

    StepOffset params = get_step_offset(dir);
    uint64_t points_scored = 0;
    for (int j = 0; j < 4; j++) {
        int stack[4] = {0};
        int idx = 0;

        for (int i = 0; i < 4; i++) {
            int curr_pos = (
                params.step * i + (
                    params.offset_start + params.offset_step * j
                )
            );
            int curr_val = (*board >> curr_pos) & 0xF;

            if (curr_val > 0) {
                if (stack[idx] == 0) {
                    stack[idx] = curr_val;
                } else if (curr_val == stack[idx]) {
                    stack[idx]++;
                    points_scored += (1 << stack[idx]);
                    idx++;
                } else {
                    idx++;
                    stack[idx] = curr_val;
                }
            }
        }
        for (int i = 0; i < 4; i++) {
            int curr_pos = (
                params.step * i + (
                    params.offset_start + params.offset_step * j
                )
            );
            set_tile(board, curr_pos, stack[i]);
        }
    }
    return points_scored;
}



void print_underline() {
    for (int i = 0; i < SIZE * (CELL_WIDTH + 1) + 1; i++) putchar('-');
    putchar('\n');
    return;
}


void print_cell(uint32_t exp) {
    char buff[16];
    // write 2^exp to buff (or 0 if exp == 0)
    int len = snprintf(buff, sizeof(buff), "%u", exp == 0 ? 0 : (1 << exp));

    // determine padding of cell
    int padding = CELL_WIDTH - 2 - len;
    int left = padding / 2;
    int right = padding - left;

    // print cell with left border
    printf("|%*s%s%*s", left + 1, "", buff, right+1, "");
}


void print_board(uint64_t board, uint64_t score) {

    printf("SCORE: %" PRIu64 "\n", score);
    print_underline();
    for (int i = SIZE-1; i > -1; i--) {
        for (int j = SIZE-1; j > -1; j--) {
            uint32_t exp = (board >> (4*((i * SIZE) + j))) & 0xF;
            print_cell(exp);
        }
        printf("|\n");
        print_underline();
    }
    return;
}
