"use strict";

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function main() {
  const file = await _fs.promises.readFile(_path.default.join(__dirname, '../src/input'), 'utf8');
  const frequencyDrifts = file.split('\n').map(Number);
  const finalFrequency = frequencyDrifts.reduce((frequency, drift) => frequency + drift, 0);
  const {
    firstDouble
  } = findDouble({
    initial: 0,
    counts: {},
    frequencyDrifts
  });
  return {
    finalFrequency,
    firstDouble
  };
}

function getFrequencies(frequencyDrifts, initial) {
  return frequencyDrifts.reduce(({
    curr,
    frequencies
  }, drift) => {
    const newFrequency = curr + drift; // console.log(curr + '\t+\t' + drift + '\t=\t' + newFrequency);

    frequencies.push(newFrequency);
    return {
      curr: newFrequency,
      frequencies
    };
  }, {
    curr: initial,
    frequencies: []
  });
}

function findDouble({
  initial,
  frequencyDrifts,
  counts
}) {
  const {
    frequencies
  } = getFrequencies(frequencyDrifts, initial);
  const {
    firstDouble,
    counts: newCounts
  } = frequencies.reduce(({
    counts,
    firstDouble
  }, frequency) => {
    counts[frequency] = (counts[frequency] || 0) + 1;

    if (counts[frequency] === 2 && !firstDouble) {
      console.log('bing bing bing', frequency);
      return {
        counts,
        firstDouble: frequency
      };
    }

    return {
      counts,
      firstDouble
    };
  }, {
    counts,
    firstDouble: undefined
  });

  if (firstDouble) {
    return {
      firstDouble,
      counts: newCounts
    };
  }

  return findDouble({
    frequencyDrifts,
    initial: frequencies[frequencies.length - 1],
    counts: newCounts
  });
}

main().then(console.log).catch(console.error);