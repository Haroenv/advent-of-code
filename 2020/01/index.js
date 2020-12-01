import input from './input.js';

/**
 * @param {number[]} list
 * @param {number} sum
 */
function findSumTwo(list, sum) {
  for (let i = list.length; i > 0; i--) {
    const item = list[i];
    for (let j = 0; j < i; j++) {
      const secondItem = list[j];
      if (item + secondItem === sum) {
        return [item, secondItem];
      }
    }
  }
}

/**
 * @param {number[]} list
 * @param {number} sum
 */
function findSumThree(list, sum) {
  for (let i = list.length; i > 0; i--) {
    const item = list[i];
    for (let j = 0; j < i; j++) {
      const secondItem = list[j];
      for (let k = 0; k < j; k++) {
        const thirdItem = list[k];
        if (item + secondItem + thirdItem === sum) {
          return [item, secondItem, thirdItem];
        }
      }
    }
  }
}

console.time('sort');
input.sort((a, b) => a - b);
console.timeEnd('sort');

console.time('two');
console.log(findSumTwo(input, 2020).reduce((curr, item) => item * curr, 1));
console.timeEnd('two');

console.time('three');
console.log(findSumThree(input, 2020).reduce((curr, item) => item * curr, 1));
console.timeEnd('three');
