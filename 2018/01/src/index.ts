import { promises as fs } from 'fs';
import path from 'path';

async function main() {
  const file = await fs.readFile(path.join(__dirname, '../src/input'), 'utf8');

  const frequencyDrifts = file.split('\n').map(Number);

  const finalFrequency = frequencyDrifts.reduce(
    (frequency, drift) => frequency + drift,
    0
  );

  const { firstDouble } = findDouble({
    initial: 0,
    counts: {},
    frequencyDrifts,
  });

  return {
    finalFrequency,
    firstDouble,
  };
}

function getFrequencies(frequencyDrifts: number[], initial: number) {
  return frequencyDrifts.reduce(
    ({ curr, frequencies }, drift) => {
      const newFrequency = curr + drift;
      frequencies.push(newFrequency);
      return {
        curr: newFrequency,
        frequencies,
      };
    },
    { curr: initial, frequencies: [] }
  );
}

function findDouble({
  initial,
  frequencyDrifts,
  counts,
}: {
  initial: number;
  frequencyDrifts: number[];
  counts: { [key: string]: number };
}) {
  const { frequencies } = getFrequencies(frequencyDrifts, initial);
  const { firstDouble, counts: newCounts } = frequencies.reduce(
    ({ counts, firstDouble }, frequency) => {
      counts[frequency] = (counts[frequency] || 0) + 1;
      if (counts[frequency] === 2 && !firstDouble) {
        return {
          counts,
          firstDouble: frequency,
        };
      }
      return {
        counts,
        firstDouble,
      };
    },
    {
      counts,
      firstDouble: undefined,
    }
  );
  if (firstDouble) {
    return { firstDouble, counts: newCounts };
  }
  return findDouble({
    frequencyDrifts,
    initial: frequencies[frequencies.length - 1],
    counts: newCounts,
  });
}

main()
  .then(console.log)
  .catch(console.error);
