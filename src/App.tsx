import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/global/layout";
import { ThemeProvider } from "./providers/theme-provider";
import Home from "./pages/home";
import ImageLabeler from "./pages/image-labeler/page";
import MailConfirm from "./pages/MailConfirm";
import Project from "./pages/project";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/auth/confirm-verification",
        element: <MailConfirm />,
      },
      {
        path: "/setting",
        element: <div>세팅</div>,
      },
      {
        path: "project/:project_id/labeler/:image_id",
        element: <ImageLabeler />,
      },
      {
        path: "/project/:id",
        element: <Project />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="project-x-remote-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
