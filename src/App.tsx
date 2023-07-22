import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddJobApply } from "./components/AddJobApply";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddJobApply />,
  },
  {
    path: "/home",
    element: <div>Home</div>,
  },
]);

function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
