import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js';
const { ChromePicker } = React;
const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function NoteDuplicate({onDuplicateNote, note}){

    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const [formSubmitted, setFormSubmitted] = useState(false);
    const params = useParams()

    useEffect(() => {
        if (params.noteId) loadNote()
    }, [])

    function loadNote() {
        noteService
            .get(params.noteId)
            .then(setNoteToAdd)
            .catch(err => console.log('err:', err))
    }
 

    // const [noteToAdd, setNoteToAdd] = useState({})
  
  return  <div onClick={() => {
{noteService.save(note) }
  onDuplicateNote(note)}}><i class="fa-solid fa-copy"></i></div>
}

    

