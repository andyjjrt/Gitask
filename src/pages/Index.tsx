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
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setOpen(false);
    fetchTask()
  }

  const fetchTask = async () => {
    setLoading(true);
    const res = await fetchApi("task", "get").then(_res => _res.data)
    const { success, data } = res;
    setTasks(data.items);
    setCount(data.total);
    setLoading(false)
  }

  useEffect(() => {
    fetchTask()
  }, []);

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex justify-end shrink-0">
        <button className="btn" onClick={() => setOpen(true)}>
          open
        </button>
      </div>
      <div className="flex flex-col gap-2 grow overflow-auto">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>

      <TaskEditor open={open} handleClose={handleClose} />
    </div>
  );
};

export default Index;
