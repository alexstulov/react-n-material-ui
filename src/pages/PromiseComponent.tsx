import React from 'react';

function PromiseComponent() {

    let [data, setData]  = React.useState('Loading');

    const hello = () => {
        var promise = new Promise(function(resolve, reject) {
            // do a thing, possibly async, then…

            setTimeout(() => {
                if (Math.random() >= 0.4) {
                    resolve("Stuff worked!");
                } else {
                    reject('Stuff failed!');
                }
            }, 2000);
        });
        promise.then(function(result:any) {
            setData('' + result);
            console.log(result, data);
            console.log('success', result); // "Stuff worked!"
            return 2;
        }, function(err:any) {
            setData('' + err);
            console.log('error', err); // Error: "It broke"
            return 1;
        }).then(function(num:any) {
            console.log(num);
            return num+1;
        }).then(function(num:any) {
            console.log(num);
            return num+'asdf';
        }).then((num:any) => {
            console.log(num);
            throw Error('hello');
        }).catch((err:any) => {
            console.log(err);
        });
    }

    return (
        <div>
            <button onClick={hello}>Hello</button>
            <h1>{data}</h1>
        </div>
    );
}

export default PromiseComponent;