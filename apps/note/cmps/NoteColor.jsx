const {useState} = React
const { ChromePicker } = React;

export function NoteColor({onChangeNoteColor }){

const [showColorPicker, setShowColorPicker] = useState(false);
const [selectedColor, setSelectedColor] = useState('#BBBBBB'); // Default color

//   const handleColorClick = () => {
//     setShowColorPicker(!showColorPicker);
//   };

  function handleChange (color) {
    setSelectedColor(color);
  };

//   const handleClose = () => {
//     setShowColorPicker(false);
//   };



  return (
    <div>
        <div onClick={() => onChangeNoteColor('Tomato')}>
            red 
        </div>
        <div onClick={() => onChangeNoteColor('DodgerBlue')}>
            blue 
        </div>
        <div onClick={() => onChangeNoteColor('Violet')}>
            violet 
        </div>
        <div onClick={() => onChangeNoteColor('LightGray')}>
            grey 
        </div>
        <div onClick={() => onChangeNoteColor('white')}>
            white 
        </div>
    </div>
  );
}

    

{/* <button onClick={handleColorClick}>Select Color</button>
      {showColorPicker && (
        <div>
           color={selectedColor} onChange={handleChange} 
          <button onClick={handleClose}>Close</button>
        </div>
      )}
      <div style={{ backgroundColor: selectedColor }}>
        Selected Color: {selectedColor}
      </div> */}