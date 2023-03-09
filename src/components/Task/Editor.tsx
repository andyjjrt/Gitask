// Hooks
import { FormEvent, useEffect, useMemo, useState } from "react";
// Components
import Modal from "react-modal";
// Styles
// Utils
import classnames from "classnames";
import { fetchApi } from "../../utils/api";

// Props type defination
interface Props {
  open: boolean;
  handleClose: () => void;
  type: "create" | "edit";
  title: string;
  description: string | null;
}

// Default props
const defaultProps: Props = {
  open: false,
  handleClose: () => { },
  type: "create",
  title: "",
  description: null,
};

/**
 * TaskEditor
 *
 * @param open - Determine the modal to show or not.
 * @param handleClose - Funvtion triggers when modal close
 *
 */
const TaskEditor = ({ open, handleClose, type, title, description }: Props) => {
  const [dataTitle, setDataTitle] = useState<string>(
    type === "edit" ? title : ""
  );
  const [dataDescription, setDataDescription] = useState<string>(
    type === "edit" ? description || "" : ""
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDataTitle(type === "edit" ? title : "");
    setDataDescription(type === "edit" ? description || "" : "");
  }, [open]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetchApi(apiEndpoint, "post", {
      data: {
        title: dataTitle,
        description: dataDescription,
      },
    });
    const { data, success } = response.data;
    setTimeout(() => handleClose(), 1000)
    
  };

  const modalTitle = useMemo(() => {
    switch (type) {
      case "create":
        return "新增";
      case "edit":
        return "編輯";
      default:
        return "未知";
    }
  }, [type]);

  const apiEndpoint = useMemo(() => {
    switch (type) {
      case "create":
        return "/task/open";
      case "edit":
        return "/task/add";
      default:
        return "";
    }
  }, [type]);

  return (
    <Modal
      isOpen={open}
      overlayClassName={classnames(
        "bg-[#000000bb]",
        "fixed",
        "inset-0",
        "flex",
        "items-center",
        "justify-center"
      )}
      className={classnames(
        "rounded-lg",
        "bg-white",
        "p-8",
        "outline-none",
        "w-[90vw]",
        "max-w-lg",
        "h-[40vh]"
      )}
      onRequestClose={loading ? () => {} : handleClose}
      appElement={document.getElementById("root") || undefined}
    >
      <form onSubmit={handleSubmit} className="h-full flex flex-col gap-2">
        <h2 className="text-2xl">{modalTitle}</h2>
        <div className="flex flex-col gap-2 grow">
          <div className="flex flex-col gap-1">
            <span>title</span>
            <input
              value={dataTitle}
              onChange={(e) => setDataTitle(e.target.value)}
              className="border-2 p-1 rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>description</span>
            <input
              value={dataDescription}
              onChange={(e) => setDataDescription(e.target.value)}
              className="border-2 p-1 rounded-md outline-none"
            />
          </div>
        </div>
        <div className="flex justify-end shrink-0">
          <button type="submit" className="btn">
            送出
          </button>
        </div>
      </form>
    </Modal>
  );
};

TaskEditor.defaultProps = defaultProps;

export default TaskEditor;
