const compose = <R>(...funcs: Array<(a: R | any) => R | any>) => (comp: R) => 
  funcs.reduceRight((wrapped: R | any, f: R | any) => f(wrapped), comp);  

export default compose;
  