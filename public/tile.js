class Tile {

  constructor(xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.piece = 2;
  }

  render() {
    let [x, y] = pos2cartesian(this.xpos, this.ypos);
    fill(255);
    rect(x, y, RES, RES);
    if (this.piece != 2) {
      fill(COLOR[this.piece]);
      ellipse(x + RES / 2, y + RES / 2, RES * 0.8, RES * 0.8);
    }
  }

  click() {
    let neighborBelow = Tile.getTileByPos(this.xpos, (this.ypos + 1));
    if (neighborBelow != undefined && neighborBelow.piece == 2) {
      return neighborBelow.click();
    } else {
      if (this.piece != 2) return false;
      this.piece = CURR_PLAYER;
      this.validateWin();
      return true;
    }
  }

  validateWin() {
    //horizontal
    let countHoriz = 1;
    let countVert = 1;
    let countDiag1 = 1;
    let countDiag2 = 1;
    //right side
    for (let h = 1; this.xpos + h < COLS && Tile.getTileByPos(this.xpos + h, this.ypos).piece == this.piece; h++)
      countHoriz++;
    //left side
    for (let h = -1; this.xpos + h > 0 && Tile.getTileByPos(this.xpos + h, this.ypos).piece == this.piece; h--)
      countHoriz++;

    // console.log('wincondition (horizontal): ', countHoriz);

    //down side
    for (let h = 1; this.ypos + h < ROWS && Tile.getTileByPos(this.xpos, this.ypos + h).piece == this.piece; h++)
      countVert++;
    //up side
    for (let h = -1; this.ypos + h > 0 && Tile.getTileByPos(this.xpos, this.ypos + h).piece == this.piece; h--)
      countVert++;

    // console.log('wincondition (vertical): ', countVert);


    // \ diag downwards
    for (let h = 1; this.ypos + h < ROWS && this.xpos + h < COLS && Tile.getTileByPos(this.xpos + h, this.ypos + h).piece == this.piece; h++)
      countDiag1++;
    // \ diag upwards
    for (let h = -1; this.ypos + h > 0 && this.xpos + h > 0 && Tile.getTileByPos(this.xpos + h, this.ypos + h).piece == this.piece; h--) {
      countDiag1++;
    }
    // console.log('wincondition (\\ diag): ', countDiag1);

    // / diag upwards
    for (let h = 1; this.ypos - h > 0 && this.xpos + h < COLS && Tile.getTileByPos(this.xpos + h, this.ypos - h).piece == this.piece; h++)
      countDiag2++;
    // / diag downwards
    for (let h = -1; this.ypos - h < ROWS && this.xpos + h > 0 && Tile.getTileByPos(this.xpos + h, this.ypos - h).piece == this.piece; h--) {
      countDiag2++;
    }

    // console.log('wincondition (/ diag): ', countDiag2);

    if (countDiag2 >= 4) console.log('Player wins! /');
    else if (countDiag1 >= 4) console.log('Player wins! \\');
    else if (countVert >= 4) console.log('Player wins! |');
    else if (countHoriz >= 4) console.log('Player wins! -');

  }

  static getTileByPos(xpos, ypos) {
    return tiles[xpos + COLS * ypos];
  }
}
