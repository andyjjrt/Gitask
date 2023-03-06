// Hooks
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
// Components
// Styles
// Utils
import ajax from "../utils/api";

const OauthCallback = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    ajax("/oauth/code", "post", "", {
      data: {
        code: searchParams.get("code"),
      },
    })
      .then((res) => {
        const { success, data } = res.data;
        if (!success) throw new Error(data.message);
        localStorage.setItem("authToken", data.access_token);
        navigate("/")
      })
      .catch((error: any) => {
        console.error(error);
        navigate("/login");
      });
  }, []);

  return <p>oauthCallback</p>;
};

export default OauthCallback;
