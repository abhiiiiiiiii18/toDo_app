import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../todoSlice";

const TodoInput = () => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Personal");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (task.trim()) {
      dispatch(addTodo({ text: task, category }));
      setTask("");
      setCategory("Personal"); // Reset category after adding
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <input
        className="border text-center p-2 w-full mb-2 rounded-lg"
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task..."
      />

      <select
        className="border p-2 w-full mb-2 rounded-lg"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Shopping">Shopping</option>
        <option value="Others">Others</option>
      </select>

      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white p-2 w-full rounded-lg hover:bg-blue-600 transition"
      >
        Add Task
      </button>
    </div>
  );
};

export default TodoInput;
