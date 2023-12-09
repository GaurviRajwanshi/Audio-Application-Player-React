export const generateUniqueKey = (() => {
  let counter = 7;

  return () => {
    const key = counter;
    counter += 1;
    return key;
  };
})();
