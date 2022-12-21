import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/product/:id",
        element: <ProductScreen />,
      },
      {
        path: "/cart",
        element: <CartScreen />,
        children: [
          {
            path: ":id",
            element: <CartScreen />,
          },
        ],
      },
    ],
  },
]);
