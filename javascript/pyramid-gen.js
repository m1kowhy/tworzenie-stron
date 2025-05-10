function pyramid(char, rows, reverse) {
  let result = "\n";
  if (reverse) {
    for (let i = rows; i >= 1; i--) {
      let spaces = " ".repeat(rows - i);
      let chars = char.repeat(i * 2 - 1);
      result += spaces + chars + "\n";
    }
  } else {
    for (let i = 1; i <= rows; i++) {
      let spaces = " ".repeat(rows - i);
      let chars = char.repeat(i * 2 - 1);
      result += spaces + chars + "\n";
    }
  }
  return result;
}


