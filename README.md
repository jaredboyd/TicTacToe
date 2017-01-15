# TicTacToe

[Play it here](http://www.jaredrboyd.com/tictactoe/TicTacToe.html)

I decided I wanted to create a tic tac toe game, and I have been able to learn a little bit in the process.

I had never used the canvas element before, and was able to teach myself quite a bit about that in the process of making this game. I think what I'm most proud of from this game is the fact that I can rescale the size of the tic tac toe board, and everything will still draw correctly, as well as click detection still working correctly.

The simple AI I made was just to get a computer opponent up and running. It's truly simple. When it is the simple AI's turn to make a move, it picks any random empty square with no attempt to win.

The harder AI I made was meant to be a little smarter than the simple AI. Firstly, what it does is check to see if it can make a play that gives it three in a row. If it doesn't have a winning move, it checks to see if the human player has a winning move available, and then blocks that move. If it doesn't have a winning move or a blocking move available, then it just plays a random empty square, just like the simple AI.