import { generateUniqueRandomList, generateRandomField } from "./random";

test("should generate random list", () => {
  const uniqueRandomList = generateUniqueRandomList(3, 3);
  expect(uniqueRandomList.length).toBe(3);
  expect(uniqueRandomList.filter((value: number) => value >= 3).length).toBe(0);
});

test("should generate random field", () => {
  const uniqueRandomList = generateRandomField(10, 3);
  expect(uniqueRandomList.length).toBe(10);
  expect(uniqueRandomList.filter((value: boolean) => !!value).length).toBe(3);
});
