// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var theRow = this.get(rowIndex);
      var peicesInRow = 0;
      for(var i = 0; i < theRow.length; i++){
        if(theRow[i] ===1){
          peicesInRow += 1;
        };
      };

      if(peicesInRow >= 2){
        return true;
      }else{
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let numberOfRows = this.attributes.n;
      for(let i = 0; i < numberOfRows; i++){

        if(this.hasRowConflictAt(i)){
          return true;
        }
      }

      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let numberOfRows = this.attributes.n;
      let peicesInCol = 0;

      for(let i = 0; i < numberOfRows; i++ ){
        let theRow = this.get(i);
        //collumn one*
        if(theRow[colIndex] === 1){
          peicesInCol += 1;
        }

        if(peicesInCol === 2){
          return true;
        }

      }

      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let numberOfRows = this.attributes.n;
      let numOfCol = this.attributes.n;
      //debugger;
      //loops through each collum number
      for(let i = 0; i < numOfCol; i++){
        //loops through each row at same collumn number
        if(this.hasColConflictAt(i)){

          return true;
        };
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorD) {
    let n = this.attributes.n;
    //a variable to track pieces found
    let foundPeices = 0;
    // a variable to track how many squares to check => boardsize - |major d|
    let checksNeeded = n - Math.abs(majorD);
    // a variabl that tells us which spot to start on
    let startCol;
    let startRow;
      //if major-d is positive we start at (0,major-d)
      if(majorD >= 0){
        startCol = majorD;
        startRow = 0;
      }else{
        //else if major-d is negative we start at (|major-d|, 0)
        startCol = 0;
        startRow = Math.abs(majorD);
      }
    //while spots checked < boardsize - |major d|             md = -1  SP = (1, 0) -> (2, 1)
      for(let i = 0; i < checksNeeded; i++){
        if(this.get(startRow)[startCol] === 1){
          foundPeices += 1;
        }
        startRow +=1;
        startCol +=1;

        if(foundPeices === 2){
          return true;
        }
      }

      //check the spot we started on (1 move)
      //incremenet our counter
      //increment arr index + 1
      //incremement our collumn index + 1


      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {

      //find this.attributes.n
      var n = this.attributes.n;
      let checksNeeded = [];
      //create an array of all the points where we need to check for major conflicts
      //========figure this out=========
      //need t push from n-1 -> -n+1 to an array
      for(let i = -n + 1; i < n; i++){
        checksNeeded.push(i);
      }
      //iterate through the array
      for (var i = 0; i < checksNeeded.length; i++) {
        //call the check on each value of the array
        if (this.hasMajorDiagonalConflictAt(checksNeeded[i])) {
          //if true, return true;
          return true;
        }
      }
      //end iteration and return false
      return false;


    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //create a variable for n
      var n = this.attributes.n
      //create a variable for row = 0
      var row = 0;
      //create a variable for col (argument)
      var col = minorDiagonalColumnIndexAtFirstRow;
      //create pieces variable
      var pieces = 0;
      // debugger;
      //iterate until n times
      for (var i = 0; i < n; i++) {
        //if col < n
        if (col < n) {
          //check if value is 1
          if (this.get(row)[col] === 1) {
            //if it is, increment our pieces count
            pieces ++;
          }
        }
        //decrement col
        col--;
        //increment row
        row++;
        //if pieces > 1
        if (pieces > 1) {
          //return true
          return true;
        }
      }

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //find this.attributes.n
      var n = this.attributes.n;
      let checksNeeded = [];
      //create an array of all the points where we need to check for major conflicts
      //need t push from n-1 -> -n+1 to an array
      for (var i = 0; i < (n * 2) - 2; i++) {
        checksNeeded.push(i);
      }
      //iterate through the array
      for (var i = 0; i < checksNeeded.length; i++) {
        //call the check on each value of the array
        if (this.hasMinorDiagonalConflictAt(checksNeeded[i])) {
          //if true, return true;
          return true;
        }
      }
      //end iteration and return false
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

//Time Complexity
// hasRowConflictAt -- Linear
// hasAnyRowConflicts -- Quadratic
// hasColConflictAt -- Linear
// hasAnyColConflicts -- Quadratic
// hasMajorDiagonalConflictAt -- Linear
// hasAnyMajorDiagonalConflicts -- Quadratic
// hasMinorDiagonalConflictAt - Linear
// hasAnyMinorDiagonalConflicts -- Quadratice
