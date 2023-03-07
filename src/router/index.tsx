import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layout/Index";
import OauthCallbackPage from "../pages/OauthCallback";
import LoginPage from "../pages/Login";
import IndexPage from "../pages/Index";

const routes = () => {
  return (
    <Routes>
      <Route path="/oauthCallback" element={<OauthCallbackPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route
        path="/"
        element={
          <DefaultLayout>
            <IndexPage />
          </DefaultLayout>
        }
      ></Route>
    </Routes>
  );
};

export default routes;
