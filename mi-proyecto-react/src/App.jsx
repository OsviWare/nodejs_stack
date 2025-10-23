import { useState } from "react";
import "./App.css";

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  const agregarTarea = () => {
    if (nuevaTarea.trim() !== "") {
      setTareas([...tareas, { id: Date.now(), texto: nuevaTarea }]);
      setNuevaTarea("");
    }
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Lista de Tareas - React</h1>

      <div>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea..."
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button onClick={agregarTarea} style={{ padding: "8px 16px" }}>
          Agregar
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            style={{
              padding: "10px",
              margin: "5px 0",
              backgroundColor: "#f0f0f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{tarea.texto}</span>
            <button
              onClick={() => eliminarTarea(tarea.id)}
              style={{
                backgroundColor: "#ff4444",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
