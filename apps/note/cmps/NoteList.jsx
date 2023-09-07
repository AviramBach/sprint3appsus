import { NotePreview } from './NotePreview.jsx'
const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, onChangeNoteColor }) {


    // function ColorPalette({ onSelectColor }) {
    //     const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        
    //     const handleColorSelect = (color) => {
    //       onSelectColor(color);
    //     };

    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

    return <ul className='note-list'>
        {notes.map(note => (
            <li key={note.id} className='note-card' >
                <NotePreview note={note} />
                <div className='note-footer'>
                    <button className='btn-note-remove' onClick={() => onRemoveNote(note.id)}>Remove note</button>
                    <button className='btn-note-edit'>
                        <Link to={`/note/edit/${note.id}`}>Edit</Link>
                    </button>
                    <div onClick={() => onChangeNoteColor(note.id)} className="color-palette">
                        {colors.map((color) => (
                            <div
                                key={color}
                                className="color-option"
                                style={{ backgroundColor: color }}
                                onClick={() => handleColorSelect(color)}
                            ></div>
                        ))}
                    </div>
                </div>
            </li>
        ))}
    </ul>
}

