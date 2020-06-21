const compose = (...funcs: ((component: React.FunctionComponent<any>) => React.FunctionComponent<any>)[]) =>
    (comp: React.FunctionComponent<any>) => {
        return funcs.reduceRight((
            previousResult: React.FunctionComponent<any>,
            func: (component: React.FunctionComponent<any>
            ) => React.FunctionComponent<any>) => func(previousResult), comp)
    }

export default compose;