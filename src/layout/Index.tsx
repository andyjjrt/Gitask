// Hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Components
// Styles
// Utils
import { fetchApi } from "../utils/api";

// Props type defination
interface Props {
  children?: JSX.Element;
}

// Default props
const defaultProps: Props = {};

/**
 * Default Layout
 *
 * @param children - JSX element
 *
 */
const DefaultLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () =>
      fetchApi("user", "get")
        .then((res) => {
          const { success, data } = res.data;
          if (!success) throw new Error(data.message);
        })
        .catch((error: any) => {
          // do logout
          localStorage.removeItem("authToken");
          console.error(error);
          navigate("/login");
        });

    fetchUser().then(() => setLoading(false));
  }, []);

  return <>{loading ? "" : children}</>;
};

DefaultLayout.defaultProps = defaultProps;

export default DefaultLayout;
