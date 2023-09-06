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
    return <div>
         <NoteList notes={notes} onRemoveNote={onRemoveNote} />
    </div>
}
