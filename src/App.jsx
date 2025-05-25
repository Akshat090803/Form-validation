
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailsPage from "./components/details";
import FormPage from "./components/form";
import Layout from "./components/Layout";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <FormPage />
      },
      {
        path: "details",
        element: <DetailsPage />
      }
    ]
  }
]);


function App() {


  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;

