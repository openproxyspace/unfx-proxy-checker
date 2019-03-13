export const shuffle = array => array.sort(() => Math.random() - 0.5);
export const uniq = array => [...new Set([...array])];
