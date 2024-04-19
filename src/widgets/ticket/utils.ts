export const generateRandomNums = (count: number, maxNum: number): number[] => {
  const randomNums = new Set<number>();

  while (randomNums.size < count) {
    randomNums.add(Math.ceil(Math.random() * maxNum));
  }

  return [...randomNums];
};

export const declineNumber = (number: number, titles: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};
