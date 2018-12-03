import { promises as fs } from 'fs';
import path from 'path';

async function main() {
  const file = await fs.readFile(
    path.join(__dirname, '../src/fake-input'),
    'utf8'
  );

  const labels = file.split('\n');

  const checksum = getChecksum(labels);

  const closeMatchingLabel = labels
    .map(label => {
      return [
        label,
        labels.reduce((acc, curr) => {
          if (curr === label) {
            return acc;
          }
          console.log(
            curr,
            [...curr]
              .map((l, i) => {
                if (label[i] === l) {
                  return 0;
                } else {
                  return l;
                }
              })
              .filter(l => l === 0)
          );
          if (
            [...curr]
              .map((l, i) => {
                if (label[i] === l) {
                  return 0;
                } else {
                  return l;
                }
              })
              .filter(l => l === 0).length === 1
          ) {
            return curr;
          }
        }, undefined),
      ];
    })
    .filter(([label, match]) => match);

  return {
    checksum,
    closeMatchingLabel,
  };
}

function getChecksum(labels: string[]) {
  const counts = labels.map(label =>
    [...label].reduce((acc, curr) => {
      acc.set(curr, (acc.get(curr) || 0) + 1);
      return acc;
    }, new Map())
  );

  const threes = counts.filter(count => [...count.values()].includes(3));
  const twos = counts.filter(count => [...count.values()].includes(2));

  return threes.length * twos.length;
}

main()
  .then(console.log)
  .catch(console.error);
