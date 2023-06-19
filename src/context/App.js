import { useState, createContext, useContext } from "react";

const Appcontext = createContext({ todos: [] });

export const AppProvider = ({ children }) => {
  const dataFromStorage = JSON.parse(localStorage.getItem("todos")) || [];

  const [todos, setTodos] = useState(dataFromStorage);

  const add = (todo) => {
    setTodos([...todos, todo]);
    localStorage.setItem("todos", JSON.stringify([...todos, todo]));
  };

  const remove = (todo) => {
    const newTodos = todos.filter((item, i) => todo.id !== i);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const complete = (todo) => {
    const newTodos = todos.map((item, i) => {
      if (todo.id === i) {
        return { isComplete: true, ...item };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <Appcontext.Provider value={{ todos, add, remove, complete }}>
      {children}
    </Appcontext.Provider>
  );
};

export const useTodos = () => {
  const data = useContext(Appcontext);

  if (!data) {
    throw new Error("useTodos was called without a provider");
  }
  return data;
};
