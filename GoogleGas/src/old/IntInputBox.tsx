import { useState } from "react";
import React from "react";
interface Props {
  label: string;
  valueIn: number;
  onChange: (valueIn: number) => void;
}
function IntInputBox({ label, valueIn, onChange }: Props) {
  // handleInput ensures the input is a number or sets it to 0
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value, 10);
    onChange(isNaN(inputValue) ? 0 : inputValue);
  };
  //returns the input box for a number that 
  return (
    <form>
      <label>
        {label}
        <input type="number" value={valueIn} onChange={handleInput} />
      </label>
    </form>
  );
}

export default IntInputBox;
