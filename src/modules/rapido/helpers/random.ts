const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateUniqueRandomList = (amount: number, topLimit: number) => {
  const list: number[] = [];
  for (let i = 0; i < amount; i++) {
    let random = getRandomIntInclusive(0, topLimit - 1);
    while (list.includes(random)) {
      random = getRandomIntInclusive(0, topLimit - 1);
    }
    list.push(random);
  }
  return list;
};

const generateRandomField = (size: number, truthyAmount: number) => {
  const randomList = generateUniqueRandomList(truthyAmount, size);
  return Array(size)
    .fill(false)
    .map((item, index) => randomList.includes(index));
};

export { generateUniqueRandomList, generateRandomField };
