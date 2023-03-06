// Hooks
import { useEffect, useState } from "react";
// Components
// Styles
// Utils
import { fetchApi } from "../utils/api";

const Index = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState()

  useEffect(() => {
    fetchApi("task", "get", { params: { page: 1 } })
      .then((res) => {
        const { success, data } = res.data;
        if (!success) throw new Error(data.message);
        console.log(data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return <div>Home</div>;
};

export default Index;
