const compose = (...functions) => (comp) => {
  return functions.reduceRight(
    (wrapped, functione) => functione(wrapped), comp
  );
};

export default compose;
