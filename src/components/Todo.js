import { BiTrash, BiCheck, BiCalendarEvent } from "react-icons/bi";
import { useTodos } from "../context/App";
const Todo = ({ todo }) => {
  const { remove, complete } = useTodos();
  return (
    <div className="bg-white p-3 w-[400px] relative border-b border-neutral-200 flex flex-col items-start my-2">
      <span> {todo.text}</span>
      <div className="text-xs flex gap-1 text-neutral-500 items-center">
        <BiCalendarEvent />
        <span>{todo.date}</span>
      </div>
      <div className="flex h-full items-center gap-3 absolute top-3 right-0">
        <button
          className="outline-none hover:scale-110"
          onClick={() => complete(todo)}
        >
          <BiCheck color="green" />
        </button>
        <button
          className="outline-none hover:scale-110"
          onClick={() => remove(todo)}
        >
          <BiTrash color="red" />
        </button>
      </div>
    </div>
  );
};

export default Todo;
