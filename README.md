To visualize info sometimes tree structure is helpful.

Here I tried to have declaratively described tree (in HTML),
which is fully responsive as I did not fix any sizes.

It has lines, connecting parents with children, made with js dynamically.
Lines are redrawn on window resize

Currently depth of tree is 3 levels (lines are drawn for only 3 levels)

## NEXT TO DO

change drawAllLines to accept any depth of tree, not just 3.

lines overwrite: green line can be overwritten with blue etc, maybe we can place lines next to each other. First count children then place each line to child separately - starting from different point.

maybe start from all tree hidden except root, reveal next level onclick or hover.
This way few trees can be shown starting from top line. Their roots can be siblings then for the beginning.
