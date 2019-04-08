export const setItem = (key, value) => (
  localStorage.setItem(key, JSON.stringify(value))
);

export const getItem = key => {
  const item = localStorage.getItem(key);

  if (item) return JSON.parse(item);
  return false;
};

export const removeItem = key => (
  localStorage.removeItem(key)
);

export const clearStorage = keys => {
  for (let i = 0; i < keys.length; i++) {
    removeItem(keys[i]);
  }
};
