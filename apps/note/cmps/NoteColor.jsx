const {useState} = React
const { ChromePicker } = React;

export function NoteColor({onChangeNoteColor }){

// const [showColorPicker, setShowColorPicker] = useState(false);
// const [selectedColor, setSelectedColor] = useState('#BBBBBB'); // Default color

//   const handleColorClick = () => {
//     setShowColorPicker(!showColorPicker);
//   };

  // function handleChange (color) {
  //   setSelectedColor(color);
  // };

//   const handleClose = () => {
//     setShowColorPicker(false);
//   };

const [isOpen, setIsOpen] = useState(false);
const toggleColorPicker = () => {
  setIsOpen(!isOpen);
};
const closeColorPicker = () => {
  setIsOpen(!isOpen);
};


  return ( <section onClick={closeColorPicker}>
    
    <div>
    <button className='btn-note-color-pallet' onClick={toggleColorPicker}>
      {/* {isOpen ? 'Close Color Picker' : 'Open Color Picker'} */}
      <i class="fa-solid fa-palette"></i>
    </button>
    </div>
    <div>
    {isOpen && (
      <div className='color-pallet'>
        <div onClick={() => onChangeNoteColor('Tomato')}><h1 style={{color:'Tomato'}}><i class="fa-solid fa-circle"></i></h1></div>
        <div onClick={() => onChangeNoteColor('DodgerBlue')}><h1 style={{color:'DodgerBlue'}}><i class="fa-solid fa-circle"></i></h1></div>
        <div onClick={() => onChangeNoteColor('Violet')}><h1 style={{color:'Violet'}}><i class="fa-solid fa-circle"></i></h1></div>
        <div onClick={() => onChangeNoteColor('LightGray')}><h1 style={{color:'LightGray'}}><i class="fa-solid fa-circle"></i></h1></div>
        <div onClick={() => onChangeNoteColor('white')}><h1 style={{backgroundColor:'white'}}><i class="fa-regular fa-circle"></i></h1></div>
        <div onClick={() => onChangeNoteColor('MediumSeaGreen')}><h1 style={{color:'MediumSeaGreen'}}><i class="fa-solid fa-circle"></i></h1></div>
        <div onClick={() => onChangeNoteColor('Orange')}><h1 style={{color:'Orange'}}><i class="fa-solid fa-circle"></i></h1></div>
      </div>
    )}
  </div>
  </section>);
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