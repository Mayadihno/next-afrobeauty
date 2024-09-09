export const setItem = async (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // fail silently for now
  }
};

export const getItem = async (key: string, initial?: string) => {
  try {
    const value = localStorage.getItem(key);
    return value ?? initial;
  } catch (error) {
    // fail silently for now
  }
};

export const removeItem = async (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // fail silently for now
  }
};

export const clearAllData = () => {
  localStorage
    .getAllKeys()
    .then((keys: string) => localStorage.multiRemove(keys));
};
