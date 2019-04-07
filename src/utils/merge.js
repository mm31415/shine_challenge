export const mergeIdArrays = (arr1, arr2) => {
  const filterArr2 = arr2.filter(id => arr1.indexOf(id) < 0);
  debugger
  const x = 2;
  return [...arr1, ...filterArr2];
};
