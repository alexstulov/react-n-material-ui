import React, { useEffect, useState } from 'react';

import Spinner from '../spinner';

const withData = (View: React.FC<any>) => {
    return (props: {getData: () => Promise<any[]>}) => {
        const [data, setData] = useState<any[]>([]);

        useEffect(() => {
            props.getData().then((data) => {
                setData(data);
            });
        }, [props]);

        if (!data) return <Spinner/>;

        return <View {...props} data={data}/>
    }
};

export default withData;