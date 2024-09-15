import React from 'react';
import { useState } from 'react';

const SliderComponent = ({ value, setValue, min, max, label, onMouseUp }) => {

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 py-2">
      <label htmlFor="customRange" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type="range"
          id="customRange"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          onMouseUp={onMouseUp}
          className="w-full appearance-none bg-zinc-200 rounded-lg h-2.5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SliderComponent;
