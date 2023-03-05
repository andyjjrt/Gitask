import { Routes, Route } from "react-router-dom";
import OauthCallbackPage from "../pages/OauthCallback"
import IndexPage from "../pages/Index"

const routes = () => {
  return (
    <Routes>
      <Route path="/oauth/callback" element={<OauthCallbackPage />}></Route>
      <Route path="/" element={<IndexPage />}></Route>
    </Routes>
  );
};

export default routes;