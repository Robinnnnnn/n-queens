/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.solutionFinder = function( row, n, board, checker, callback) {
  //if we're at the end of rows, we've found a solution
  if (row === n) {
    return callback();
  }

  //iterate over the columns
  for (var i = 0; i < n; i++) {
    //put a piece there
    board.togglePiece(row, i);
    //check if there are no conflicts
    if (!board[checker]()) {
      //set result = calling function again on next row
      var result = solutionFinder(row + 1, n, board, checker, callback);
      //if result has finished {
      if (result) {
        //return the result
        return result;
      }
    }
    //remove piece
    board.togglePiece(row, i);
  }
}


window.findNRooksSolution = function(n) {
  //find a solution

  var solution = new Board({n: n});
  //do some stuff to toggle pieces on and off
  //console.log(solution);
  var pieceRow;
  var pieceCol;

  for (var i = 0; i < n; i++) {
    //debugger;
    solution.attributes[i][i] = 1;
    //check if there are conflicts
    //place a piece at the current column
    //increment our row
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = new Board({n:n});
  var solutionCount = 0;

  //define: row, n, board, checker, callback
  //call the helper function,
  solutionFinder(0, n, solution, 'hasAnyRooksConflicts', function() {
    solutionCount++;
  })

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});

  let solution =  solutionFinder(0, n, board, 'hasAnyQueensConflicts', function(){
    return _.map(board.rows(), function(row){
      return row.slice();
    })
  })

  console.log(board.rows());

  solution = solution || board.rows();



  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  let board = new Board({n: n});

  solutionFinder(0, n, board, 'hasAnyQueensConflicts', function(){
    solutionCount++;
  })

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// Time Complexity
// solutionFinder  -- Linear Time
// findNRooksSolution -- Quadratic
// countNRooksSolutions -- Linear
// findNQueensSolution -- Quadratic
// countNQueensSolutions -- Quadratic