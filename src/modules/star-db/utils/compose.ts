const compose = (...funcs: ((component: React.FC<any>) => React.FC<any>)[]) =>
    (comp: React.FC<any>) => {
        return funcs.reduceRight((
            previousResult: React.FC<any>,
            func: (component: React.FC<any>
            ) => React.FC<any>) => func(previousResult), comp)
    }

export default compose;