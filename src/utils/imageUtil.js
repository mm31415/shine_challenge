export const sortByClickCount = (arr, clickCount) => (
  arr.sort((a, b) => clickCount[b] - clickCount[a])
);

export const mergeIdArrays = (arr1, arr2) => {
  const filterArr2 = arr2.filter(id => arr1.indexOf(id) < 0);

  return [...arr1, ...filterArr2];
};

export const createImageObjArr = (arr1, arr2, clickCount) => {
  const merged = mergeIdArrays(arr1, arr2, clickCount);

  return merged.map(id => ({ id, count: clickCount[id] }));
};
