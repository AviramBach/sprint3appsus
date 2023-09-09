import { NoteList } from "../cmps/NoteList.jsx"
import { NoteAdd } from "../views/NoteAdd.jsx"
import { noteService } from '../services/note.service.js'
import {utilService} from '../../../services/util.service.js'
import { storageService } from "../../../services/storage.service.js"
import {showErrorMsg, showSuccessMsg} from  "../../../services/event-bus.service.js"
import { UserMsg } from "../cmps/UserMsg.jsx"

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
                showSuccessMsg(`Note removed`)
            })
            .catch(err => {
                console.error(err)
                showErrorMsg(`Problem removing the note`)
            })
    }

    function onAddNote(newNote) {
        noteService
            .save(newNote)
            .then((newNote) => {
                setNotes(prevNotes => [...prevNotes, newNote])
                showSuccessMsg(`Note added`)
            })
            .catch(err => {
                console.error(err)
                showErrorMsg(`Problem adding the note`)
            })
    }

    function onChangeNoteColor(noteId, color) {
        noteService
            .get(noteId)
            .then(updatedNote => {
                // Update the color of the note in the state
                setNotes(prevNotes => prevNotes.map(note =>{
                    if (note.id === noteId) { note.style.backgroundColor =color
                        noteService.save(note)}
                    return note
                })) 
                // showSuccessMsg(`Note Removed! ${noteId}`)
            })
            .catch(err => {
                console.error(err)
                // showErrorMsg(`Problem Removing ${noteId}`)
            })     
    }

//this is for duplicate feature !!!!
    function onDuplicateNote(newNote,color) {
        const newId = utilService.makeId()
        noteService
            .save(newNote)
            .then(newNote => {
                // Update the color of the note in the state
                setNotes(prevNotes => [...prevNotes, { ...newNote, id: newId }] ) 
                
            })
                // showSuccessMsg(`Note Removed! ${noteId}`)
            .catch(err => {
                console.error(err)
                // showErrorMsg(`Problem Removing ${noteId}`)
            })
      
            
    }

//this is for pin feature!!!!
 function onPinNote(noteId, color) {
        noteService
            .get(noteId)
            .then(updatedNote => {
                // Update the color of the note in the state
                setNotes(prevNotes => [ updatedNote,...prevNotes.filter(note => note.id !== noteId) ])
                
                // showSuccessMsg(`Note Removed! ${noteId}`)
            })
            .save(updatedNote)
            .catch(err => {
                console.error(err)
                // showErrorMsg(`Problem Removing ${noteId}`)
            })
            
    }



    console.log(notes)

    if (!notes) return <div>Loading notes...</div>
    return <section className='note-index'>

        {/* <Link to='/note/add'>Add Note</Link> */}
        <UserMsg/>
        <NoteAdd onAddNote={onAddNote}/>
        <NoteList notes={notes} onRemoveNote={onRemoveNote} onChangeNoteColor={onChangeNoteColor} onDuplicateNote={onDuplicateNote} onPinNote={onPinNote} />

    </section>
}
