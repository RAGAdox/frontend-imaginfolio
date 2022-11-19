export const sentenceCase = (text: string) => {
  return text.length > 1 ? text[0].toUpperCase() + text.slice(1) : text;
};

export const getInitials = (text: string) =>
  text
    .split(" ")
    .map((c) => c[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

export const getGroupedArray = (array: any[], perGroup: number) => {
  let i = 0;
  let result: any[] = [];
  while (i < array.length) {
    result = [...result, array.slice(i, i + perGroup)];
    i = i + perGroup;
  }
  return result;
};
