// Hooks
// Components
// Styles
// Utils

// Props type defination
interface Props {
  task: Task | null;
}

// Default props
const defaultProps: Props = {
  task: null,
};

/**
 * Task Card
 *
 * @param task - A task
 *
 */
const TaskCard = ({ task }: Props) => {
  return (
    <div className="border shadow-sm rounded-md p-4 flex flex-col">
      <h2 className="text-xl font-bold">{task?.title}</h2>
      <p>{task?.body}</p>
    </div>
  );
};

TaskCard.defaultProps = defaultProps;

export default TaskCard;
