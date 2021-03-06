import React from 'react';
import { BookStoreServiceConsumer } from '../book-store-service-context';

const withBookstoreService = () => (Wrapped: React.FunctionComponent) => {

  return (props: any) => {
    return (
      <BookStoreServiceConsumer>
        {
          (bookstoreService) => {
            return (<Wrapped {...props}
                     bookstoreService={bookstoreService}/>);
          }
        }
      </BookStoreServiceConsumer>
    );
  }
};

export default withBookstoreService;
