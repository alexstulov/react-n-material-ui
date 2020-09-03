const getAllIndexes = (input: any[], val: any): number[] => {
  let indexes: number[] = [];
  input.forEach((item: any, index: number) => {
    if (item === val) indexes.push(index);
  });
  return indexes;
};

export default getAllIndexes;
