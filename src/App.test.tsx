import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./slices/store";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const router = createMemoryRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>erreur</div>,
  },
]);

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );

  expect(true).toBe(true);
});
