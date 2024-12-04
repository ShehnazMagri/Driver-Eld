import React, { useState } from "react";

const Test = () => {

  // Define four colors
  // const [colors, setColors] = useState(["colorred", "colorblue", "colorgreen", "coloryellow"]);
  // const handleCardClick = (index) => {
  //   const newColors = [...colors];  
  //   newColors[index] = "blue";     
  //   setColors(newColors);       
  // };

  const [color, setColour] = useState('')
  return (
    <><div>
      <button type="submit" onClick={() => setColour('red')}>red</button>
      <button type="submit" onClick={() => setColour('green')}>green</button>
      <button type="submit" onClick={() => setColour('blue')}>blue</button>
    </div><div style={{ backgroundColor: `${color}` }}>
        {color}
      </div></>
  )
};

export default Test;


