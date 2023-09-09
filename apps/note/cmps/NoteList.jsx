import { NotePreview } from './NotePreview.jsx'
import { NoteColor } from './NoteColor.jsx'
import {NoteDuplicate} from './NoteDuplicate.jsx'
const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, onChangeNoteColor ,onDuplicateNote, onPinNote}) {

    return <div className="note-list-container">
        <ul className='note-list'>
        {notes.map(note => (
            <li key={note.id} className='note-card' style={{backgroundColor:note.style.backgroundColor}}>
                <NotePreview note={note} />
                <div className='note-footer'>
                    
                    <button className='btn-note-remove' onClick={() => onRemoveNote(note.id)}><i class="fa-solid fa-trash"></i></button>
                    {/* <button className='btn-note-remove' onClick={() => onDuplicateNote(note)}><i class="fa-solid fa-copy"></i></button> */}
                    
                    <div  className="btn-note-remove">
                       <NoteDuplicate onDuplicateNote={() => onDuplicateNote(note)} note={note} />
                    </div>

                    <button className='btn-note-edit'>
                        <Link to={`/note/edit/${note.id}`}><i class="fa-solid fa-pen-to-square"></i></Link>
                    </button>

                    <div  className="color-palette">
                       <NoteColor onChangeNoteColor={(color) => onChangeNoteColor(note.id, color)} />
                    </div>

                    <button className='btn-note-remove' onClick={() => onPinNote(note.id)}><i class="fa-solid fa-thumbtack"></i></button>
                </div>
            </li>
        ))}
    </ul>
    </div>
}

