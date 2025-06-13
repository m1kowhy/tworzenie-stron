// index.js
import chalk from 'chalk';

for (let i = 1; i <= 100; i++) {
  if (i % 15 === 0) {
    console.log(chalk.magenta(i)); // podzielne przez 3 i 5
  } else if (i % 3 === 0) {
    console.log(chalk.red(i));
  } else if (i % 5 === 0) {
    console.log(chalk.blue(i));
  } else {
    console.log(chalk.white(i));
  }
}

