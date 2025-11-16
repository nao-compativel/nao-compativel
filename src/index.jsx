import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Vamos criar este arquivo a seguir
import App from "./App"; // Importa seu App.jsx

// Pega a 'div' com id 'root' do seu public/index.html
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza o seu componente App dentro dela
root.render(
  <React.StrictMode>
    <App />{" "}
  </React.StrictMode>
);
