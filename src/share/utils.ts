export const saveLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getDefaultsImage = (key: string) => {
  return localStorage.getItem(key);
};
