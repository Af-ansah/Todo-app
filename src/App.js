import { useState } from "react";
import "./App.css";
import { useTodos } from "./context/App";

import Todo from "./components/Todo";
function App() {
  const { add, todos } = useTodos();
  const completed = todos.filter((todo) => todo.isComplete);
  const unfinished = todos.filter((todo) => !todo.isComplete);
  const [data, setData] = useState("");
  return (
    <div className="App">
      <h1 className="text-red-500 text-5xl">Todo App</h1>
      <div className="px-5">
        {/*Add*/}
        <div className="flex gap-3">
          <input
            className="bg-neutral-200 p-3 w-full outline-none"
            type="text"
            placeholder="Enter Todo"
            onChange={(e) => setData(e.target.value)}
          />
          <button
            className="bg-violet-500 px-2 py-1 text-neutral-100 hover:bg-violet-600 outline-none"
            onClick={() => add({ text: data, date: new Date().toDateString() })}
          >
            Add
          </button>
        </div>
        {/* list */}
        <div>
          <div className="grid grid-cols-2 gap-3">
            <div className="mx-auto">
              <h1 className="text-lg font-bold">Todos</h1>
              {unfinished?.map((todo, i) => (
                <Todo todo={{ id: i, ...todo }} key={i} />
              ))}
            </div>
            <div className="mx-auto">
              <h1 className="text-lg font-bold">Complete</h1>
              {completed?.map((todo, i) => (
                <Todo todo={{ id: i, ...todo }} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
