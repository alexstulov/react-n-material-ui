import React from 'react';
import { CircularProgress, Typography, Button, Grid, Box } from '@mui/material/';

const PromiseComponent: React.FunctionComponent = () => {

    let [data, setData] = React.useState<string>('');

    const sendRequest = (): void => {
        setData('');
        var promise = new Promise((resolve, reject) => {
            // do a thing, possibly async, then…
            setTimeout(() => {
                if (Math.random() >= 0.4) {
                    resolve("Request worked!");
                } else {
                    reject('Request failed!');
                }
            }, 2000);
        });
        promise.then((result: any) => {
            setData('' + result);
            console.log(result, data);
            console.log('success', result); // "Stuff worked!"
            return 2;
        }, (err: any) => {
            setData('' + err);
            console.log('error', err); // Error: "It broke"
            return 1;
        }).then((num: any) => {
            console.log(num);
            return num + 1;
        }).then((num: any) => {
            console.log(num);
            return num + 'asdf';
        }).then((num: any) => {
            console.log(num);
            throw Error('hello');
        }).catch((err: any) => {
            console.log(err);
        });
    };

    return (
        <div>
            <Grid container>
                <Grid container item direction="row" justifyContent="center">
                    <Button variant="contained" color="primary" onClick={sendRequest}>Send request</Button>
                </Grid>
                <Grid container item direction="row" justifyContent="center">
                    <Box mt={2}>
                        {data ? <Typography variant="h3">{data}</Typography> : <CircularProgress />}
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default PromiseComponent;