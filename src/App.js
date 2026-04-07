import "./App.css";
import Button from "./components/Button";
import ButtonClear from "./components/ButtonClear";
import Screen from "./components/Screen";
import stefanoLogo from "./images/sinfobndo.png";
import { useState } from "react";
import { evaluate } from "mathjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [input, setInput] = useState("");

  const addInput = (value) => {
    setInput(input + value);
  };

  const calculateResult = () => {
    try {
      if (input) {
        setInput(evaluate(input).toString());
      } else {
        toast.error("Please enter values to perform calculations.");
      }
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="App">
      <div className="stefano-logo-container">
        <img className="stefano-logo" src={stefanoLogo} alt="Stefano Logo" />
      </div>
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
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="colored"
      />
    </div>
  );
}

export default App;
