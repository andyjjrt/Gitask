// Hooks
import { useEffect, useState } from "react";
// Components
import TaskEditor from "../components/Task/Editor";
import TaskCard from "../components/Task/Card";
// Styles
// Utils
import { fetchApi } from "../utils/api";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchApi("task", "get")
      .then((res) => {
        const { success, data } = res.data;
        if (!success) throw new Error(data.message);
        setTasks(data.items);
        setCount(data.total);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end">
        <button className="btn" onClick={() => setOpen(true)}>
          open
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>

      <TaskEditor open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default Index;
