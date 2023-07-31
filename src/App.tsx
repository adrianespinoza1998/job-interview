import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AddJobApply } from "./components/AddJobApply";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Interview } from "./components/Interview";
import { NavBar } from "./components/NavBar";

const NavbarWrapper = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "/",
        element: <AddJobApply />,
      },
      {
        path: "/interview",
        element: <Interview />,
      },
    ],
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
