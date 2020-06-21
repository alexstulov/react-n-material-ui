import React, { useEffect, useState } from 'react';

import Spinner from '../spinner';

const withData = (View: React.FunctionComponent<any>) => {
    return (props: {getData: () => Promise<any[]>}) => {
        const [data, setData] = useState<any[]>([]);

        useEffect(() => {
            let cancelled = false;
            props.getData().then((data) => {
                if (!cancelled) {
                    setData(data);
                }
            });

            return () => {cancelled = true;};
        }, [props]);

        if (!data) return <Spinner/>;

        return <View {...props} data={data}/>
    }
};

export default withData;