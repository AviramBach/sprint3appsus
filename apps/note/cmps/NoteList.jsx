import { NotePreview } from './NotePreview.jsx'
const { Link } = ReactRouterDOM

export function NoteList({notes, onRemoveNote}) {
    return <ul className='note-list'>
        {notes.map(note => (
            <li key={note.id } className='note-card'>
                <NotePreview note={note} />
                <div className='note-footer'>
                    <button onClick={() => onRemoveNote(note.id)}>Remove note</button>
                    <button>
                        <Link to={`/note/edit/${note.id}`}>Edit</Link>
                    </button>
                </div>
            </li>
        ))}
    </ul>
}

