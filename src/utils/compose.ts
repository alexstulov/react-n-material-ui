const compose = (...functions: any[]) => (comp: React.ReactNode) => {
  return functions.reduceRight(
    (wrapped, functione) => functione(wrapped),
    comp
  );
};

export default compose;
