import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../todoSlice";
import { useState } from "react";

const ToDoList = () => {
  const todos = useSelector((state) => state.todos.todos || []); // Fix: Accessing the correct state
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("All");

  const filteredTodos = filter === "All" ? todos : todos.filter((todo) => todo.category === filter);

  console.log("Todos from Redux:", todos);
  console.log("Filtered Todos:", filteredTodos);
  console.log("Type of todos:", typeof todos);
  console.log("Full Redux State:", useSelector((state) => state)); // Fix: Logging full state correctly

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">To-Do List</h2>

      {/* Category Filter Dropdown */}
      <select
        className="border p-2 w-full mb-4 rounded-lg bg-gray-700 text-white-500 focus:outline-none"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Shopping">Shopping</option>
        <option value="Others">Others</option>
      </select>

      {filteredTodos.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available.</p>
      ) : (
        <ul className="space-y-2">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-2 bg-gray-100 rounded-lg shadow-sm"
            >
              <div>
                <span className={todo.completed ? "line-through text-gray-500" : "text-gray-700"}>
                  {todo.text}
                </span>
                <span className="text-sm text-gray-700 ml-2 ">[{todo.category}]</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => dispatch(toggleTodo(todo.id))}
                  className={`${
                    todo.completed ? "text-green-500" : "text-blue-500"
                  } hover:text-blue-700 transition`}
                >
                  ✅
                </button>
                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToDoList;
