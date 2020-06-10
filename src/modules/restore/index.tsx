import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './components/app';
import ErrorBoundary from './components/error-boundary';
import BookStoreService from './services/book-store-service';
import {BookStoreServiceProvider} from './components/book-store-service-context'

import store from './store';

const bookStoreService = new BookStoreService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <BookStoreServiceProvider value={bookStoreService}>
                <Router>
                    <App/>
                </Router>
            </BookStoreServiceProvider>
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);