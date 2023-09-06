import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React
const { Link } = ReactRouterDOM


export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        noteService.query().then(notes => {
            setNotes(notes)
        })
    }, [])

    function onRemoveNote(noteId) {
        noteService
            .remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                // showSuccessMsg(`Note Removed! ${noteId}`)
            })
            .catch(err => {
                console.error(err)
                // showErrorMsg(`Problem Removing ${noteId}`)
            })
    }

    console.log(notes)

    if (!notes) return <div>Loading notes...</div>
    return <section className='note-index'>

        <Link to='/note/edit'>Add Note</Link>
        <NoteList notes={notes} onRemoveNote={onRemoveNote} />
    
    </section>
}
