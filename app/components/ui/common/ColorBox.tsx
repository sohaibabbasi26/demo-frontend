"use client";
import React, { useState } from "react";
import { SketchPicker } from "react-color";

interface ColorBoxProps {
  title: string;
  color: string;
  id: string; 
  openedColorPicker: string | null;
  onClick: (id: string) => void;
  onColorChange: (colorValue: string) => void; 
}

const ColorBox: React.FC<ColorBoxProps> = ({
  title,
  color,
  id,
  openedColorPicker,
  onClick,
  onColorChange
}) => {
  const [selectedColor, setSelectedColor] = useState(color);

  const handleColorChange = (color: any) => {
    setSelectedColor(color.hex);
    onColorChange( color.hex); 
  };

  const isOpen = openedColorPicker === id;

  return (  
    <div className="flex flex-col my-1">
      <div className="mr-4 font-[500] text-[16px] font-poppins text-textBlack">{title}</div>
      <div
        style={{
          backgroundColor: selectedColor,
          width: "30px",
          height: "30px",
          cursor: "pointer",
          borderRadius: 5,
          marginTop: "4px",
          marginBottom: "4px",
        }}
        onClick={() => onClick(id)} 
      ></div>

      {isOpen && (
        <div className="absolute top-1/2 -left-[55%]">
          <SketchPicker
            color={selectedColor}
            onChangeComplete={handleColorChange}
          />
        </div>
      )}
    </div>
  );
};

export default ColorBox;
