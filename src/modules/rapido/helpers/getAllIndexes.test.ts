import getAllIndexes from "./getAllIndexes";

test("should return empty array", () => {
  const result = getAllIndexes([1, 2, 3], 4);
  expect(result).toStrictEqual([]);
});

test("should return array of two", () => {
  const result = getAllIndexes([1, 2, 3, 2], 2);
  expect(result).toStrictEqual([1, 3]);
});
