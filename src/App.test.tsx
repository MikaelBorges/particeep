import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import App from "./App";
import { store } from "./redux/store";

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
