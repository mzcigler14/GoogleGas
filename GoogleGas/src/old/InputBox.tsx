import { useState } from "react";
import React from "react";
interface Props {
  label: string;
  valueIn: string;
  setString: React.Dispatch<React.SetStateAction<string>>;
  onChange: (
    valueIn: string,
    setVal: React.Dispatch<React.SetStateAction<string>>
  ) => void;
}
function InputBox({ label, valueIn, setString, onChange }: Props) {
  return (
    <form>
      <label>
        {label}
        <input
          type="text"
          value={valueIn}
          onChange={(e) => onChange(e.target.value, setString)}
        />{" "}
      </label>
    </form>
  );
}

export default InputBox;
