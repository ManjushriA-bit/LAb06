import { useState, useEffect } from "react";

function App() {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);

  // Load saved habits
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("habits"));
    if (saved) setHabits(saved);
  }, []);

  // Save habits
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (habit.trim() === "") return;
    setHabits([...habits, { text: habit, done: false }]);
    setHabit("");
  };

  const toggleHabit = (index) => {
    const updated = [...habits];
    updated[index].done = !updated[index].done;
    setHabits(updated);
  };

  const deleteHabit = (index) => {
    const updated = habits.filter((_, i) => i !== index);
    setHabits(updated);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Habit Tracker</h1>

      <input
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Enter habit"
      />
      <button onClick={addHabit}>Add</button>

      <ul>
        {habits.map((h, i) => (
          <li key={i}>
            <span
              onClick={() => toggleHabit(i)}
              style={{
                textDecoration: h.done ? "line-through" : "none",
                cursor: "pointer",
                marginRight: 10
              }}
            >
              {h.text}
            </span>

            <button onClick={() => deleteHabit(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;