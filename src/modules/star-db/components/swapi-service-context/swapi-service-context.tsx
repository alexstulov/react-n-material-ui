import {createContext} from 'react';

const {
    Provider: SwapiServiceProvider,
    Consumer: SwapiServiceConsumer
} = createContext({});

export {
    SwapiServiceProvider,
    SwapiServiceConsumer
}