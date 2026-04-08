import "./App.css";
import Button from "./components/Button";
import ButtonClear from "./components/ButtonClear";
import Screen from "./components/Screen";
import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "./components/Logo";
import ButtonDelete from "./components/ButtonDelete";

function App() {
  const [input, setInput] = useState("");
  const [activeKey, setActiveKey] = useState("");

  const operadores = ["+", "-", "*", "/"];

  const addInput = (value) => {
    const ultimo = input.slice(-1);

    //Evito operadores al inicio
    if (input === "" && operadores.includes(value)) {
      return;
    }

    //Reemplazo operador si ya hay uno
    if (operadores.includes(value) && operadores.includes(ultimo)) {
      setInput(input.slice(0, -1) + value);
      return;
    }

    //Evito múltiples puntos en un mismo número
    if (value === ".") {
      const partes = input.split(/[\+\-\*\/]/);
      const ultimoNumero = partes[partes.length - 1];

      if (ultimoNumero.includes(".")) {
        return;
      }
    }

    setInput(input + value);
  };

  const calculateResult = () => {
    if (!input) {
      toast.info("Please enter values to perform calculations.");
      return;
    }

    const ultimo = input.slice(-1);

    //No permitir terminar en operador
    if (operadores.includes(ultimo)) {
      toast.error("Expression cannot end with an operator");
      return;
    }

    try {
      const resultado = evaluate(input);
      setInput(resultado.toString());
    } catch (error) {
      toast.error("Invalid expression");
      setInput("");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      setActiveKey(key); // 🔥 iluminación

      // 🎯 Números
      if (!isNaN(key)) {
        addInput(key);
        return;
      }

      // 🎯 Operadores
      if (operadores.includes(key)) {
        addInput(key);
        return;
      }

      // 🎯 Punto
      if (key === ".") {
        addInput(key);
        return;
      }

      // 🧮 Calcular
      if (key === "Enter") {
        calculateResult();
        return;
      }

      // ⬅️ Borrar
      if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
        return;
      }

      // 🧼 Limpiar
      if (key === "Escape") {
        setInput("");
        return;
      }
    };

    const handleKeyUp = () => {
      setActiveKey("");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [input]);

  return (
    <div className="App">
      <Logo />
      <div className="container-calculator">
        <Screen input={input} />
        <div className="file">
          <Button handleInput={addInput} value="1" activeKey={activeKey} />
          <Button handleInput={addInput} value="2" activeKey={activeKey} />
          <Button handleInput={addInput} value="3" activeKey={activeKey} />
          <Button handleInput={addInput} value="+" activeKey={activeKey} />
        </div>
        <div className="file">
          <Button handleInput={addInput} value="4" activeKey={activeKey} />
          <Button handleInput={addInput} value="5" activeKey={activeKey} />
          <Button handleInput={addInput} value="6" activeKey={activeKey} />
          <Button handleInput={addInput} value="-" activeKey={activeKey} />
        </div>
        <div className="file">
          <Button handleInput={addInput} value="7" activeKey={activeKey} />
          <Button handleInput={addInput} value="8" activeKey={activeKey} />
          <Button handleInput={addInput} value="9" activeKey={activeKey} />
          <Button handleInput={addInput} value="*" activeKey={activeKey} />
        </div>
        <div className="file">
          <Button
            handleInput={calculateResult}
            value="="
            activeKey={activeKey}
          />
          <Button handleInput={addInput} value="0" activeKey={activeKey} />
          <Button handleInput={addInput} value="." activeKey={activeKey} />
          <Button handleInput={addInput} value="/" activeKey={activeKey} />
        </div>
        <div className="file">
          <ButtonClear handleClear={() => setInput("")} value="Clear" />
          <ButtonDelete
            handleDelete={() => setInput(input.slice(0, -1))}
            value="Delete"
          />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="colored"
      />
    </div>
  );
}

export default App;
