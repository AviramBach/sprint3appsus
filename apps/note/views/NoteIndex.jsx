import { NoteList } from "../cmps/NoteList.jsx"
import { NoteAdd } from "../views/NoteAdd.jsx"
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

    function onAddNote(noteId) {
        noteService
            .save(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.push(note => note.id === noteId))
                // showSuccessMsg(`Note Removed! ${noteId}`)
            })
            .catch(err => {
                console.error(err)
                // showErrorMsg(`Problem Removing ${noteId}`)
            })
    }

    function onChangeNoteColor(noteId) {
        noteService
            .get(noteId)
            .then(updatedNote => {
                // Update the color of the note in the state
                setNotes(prevNotes =>
                    prevNotes.map(note => (note.id === noteId ? { ...note, color: updatedNote.color } : note))
                )
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

        {/* <Link to='/note/add'>Add Note</Link> */}
        <NoteAdd onAddNote={onAddNote}/>
        <NoteList notes={notes} onRemoveNote={onRemoveNote} onChangeNoteColor={onChangeNoteColor} />

    </section>
}
