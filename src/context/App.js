import { useState, createContext, useContext } from "react";

const Appcontext = createContext({ todos: [] });

export const AppProvider = ({ children }) => {
  const dataFromStorage = JSON.parse(localStorage.getItem("todos")) || [];

  const [todos, setTodos] = useState(dataFromStorage);

  const add = (todo) => {
    setTodos([...todos, { ...todo, id: todos.length + 1 }]);
    localStorage.setItem("todos", JSON.stringify([...todos, todo]));
  };

  const remove = (todo) => {
    const newTodos = todos.filter((item) => todo.id !== item.id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const complete = (todo) => {
    const newTodos = todos.map((item) => {
      if (todo.id === item.id) {
        return { isComplete: true, ...item };
      } else {
        return { ...item };
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
