import "./index.css";
import React from "react";
import DynamicTable from "./components/DynamicTable";
import jsonData from "./data/example.json";

export default function App() {
  return (
    <div className="App">
      <h1>Динамическая таблица</h1>
      <DynamicTable data={jsonData} />
    </div>
  );
}
