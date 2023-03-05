// Hooks
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// Components
// Styles
// Utils
import ajax from "../utils/api";

const OauthCallback = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    ajax("/login/oauth/access_token", "post", "", {
      params: {
        client_id: import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID,
        client_secret: import.meta.env.VITE_GITHUB_OAUTH_CLIENT_SECRET,
        code: searchParams.get("code"),
      },
      headers: {
        Accept: "application/json",
      },
    });
  }, []);

  return <p>hello world</p>;
};

export default OauthCallback;
