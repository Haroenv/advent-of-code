"use strict";

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function main() {
  const file = await _fs.promises.readFile(_path.default.join(__dirname, '../src/fake-input'), 'utf8');
  const labels = file.split('\n'); // const checksum = getChecksum(labels);

  const closeMatchingLabel = labels.map(label => {
    return [label, labels.reduce((acc, curr) => {
      if (curr === label) {
        return acc;
      }

      if ([...curr].map((l, i) => {
        if (label[i] === l) {
          return 0;
        } else {
          return l;
        }
      }).filter(l => l === 0).length === 1) {
        return [label, curr];
      }
    }, [])];
  }).filter(([label, match]) => match);
  return {
    closeMatchingLabel // checksum,

  };
}

function getChecksum(labels) {
  const counts = labels.map(label => [...label].reduce((acc, curr) => {
    acc.set(curr, (acc.get(curr) || 0) + 1);
    return acc;
  }, new Map()));
  const threes = counts.filter(count => [...count.values()].includes(3));
  const twos = counts.filter(count => [...count.values()].includes(2));
  return threes.length * twos.length;
}

main().then(console.log).catch(console.error);