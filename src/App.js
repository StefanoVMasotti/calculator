import "./App.css";
import Button from "./components/Button";
import ButtonClear from "./components/ButtonClear";
import Screen from "./components/Screen";
import { useState } from "react";
import { evaluate } from "mathjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "./components/Logo";
import ButtonDelete from "./components/ButtonDelete";

function App() {
  const [input, setInput] = useState("");

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

    // ❌ No permitir terminar en operador
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

  return (
    <div className="App">
      <Logo />
      <div className="container-calculator">
        <Screen input={input} />
        <div className="file">
          <Button handleInput={addInput} value="1" />
          <Button handleInput={addInput} value="2" />
          <Button handleInput={addInput} value="3" />
          <Button handleInput={addInput} value="+" />
        </div>
        <div className="file">
          <Button handleInput={addInput} value="4" />
          <Button handleInput={addInput} value="5" />
          <Button handleInput={addInput} value="6" />
          <Button handleInput={addInput} value="-" />
        </div>
        <div className="file">
          <Button handleInput={addInput} value="7" />
          <Button handleInput={addInput} value="8" />
          <Button handleInput={addInput} value="9" />
          <Button handleInput={addInput} value="*" />
        </div>
        <div className="file">
          <Button handleInput={calculateResult} value="=" />
          <Button handleInput={addInput} value="0" />
          <Button handleInput={addInput} value="." />
          <Button handleInput={addInput} value="/" />
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
