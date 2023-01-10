import React from "react";
import ShopHeader from "./components/shop-header";
import { HomePage, CartPage } from "./components/pages";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import ErrorBoundary from "./components/error-boundary";
import BookStoreService from "./services/book-store-service";
import { BookStoreServiceProvider } from "./components/book-store-service-context";

import store from "./store";

import "./styles/bootstrap.min.css";

const basePath = "/restore";
const shopPage = {
  path: `${basePath}/`,
  name: "Shop",
};
const cartPage = {
  path: `${basePath}/cart`,
  name: "Cart",
};

const reStoreWrapper = (Page: React.FunctionComponent) => () => {
  const bookStoreService = new BookStoreService();

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <BookStoreServiceProvider value={bookStoreService}>
            <main role="main" className="container">
              <ShopHeader />
              <Page />
            </main>
        </BookStoreServiceProvider>
      </ErrorBoundary>
    </Provider>
  );
};

const WrappedHomePage = reStoreWrapper(HomePage)
const WrappedCartPage = reStoreWrapper(CartPage)

export default () => {
    return {
        name: "ReStore",
        routes: [
            {
                routeProps: {
                    path: shopPage.path,
                    exact: true,
                    element: <WrappedHomePage />,
                },
                name: shopPage.name
            },
            {
                routeProps: {
                    path: cartPage.path,
                    exact: true,
                    element: <WrappedCartPage />,
                },
                name: cartPage.name
            }
        ]
    }
}