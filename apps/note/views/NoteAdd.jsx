import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM



export function NoteAdd({ onAddNote }) {
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const [formSubmitted, setFormSubmitted] = useState(false);
    const params = useParams()
    // const navigate = useNavigate()
    // const [notes, setNotes] = useState(null)

    useEffect(() => {
        if (params.noteId) loadNote()
    }, [])


    function loadNote() {
        noteService
            .get(params.noteId)
            .then(setNoteToAdd)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (target.type === 'text') {
            setNoteToAdd(prevNoteToAdd => ({
                ...prevNoteToAdd,
                info: {
                    ...prevNoteToAdd.info,
                    [field]: value
                }
            }))
        } else {
            switch (target.type) {
                case 'number':
                case 'range':
                    value = +value || ''
                    break

                case 'checkbox':
                    value = target.checked
                    break

                default:
                    break
            }
            setNoteToAdd(prevNoteToAdd => ({
                ...prevNoteToAdd,
                [field]: value
            }))
        }
    }

    function onSubmitNote(ev) {
        ev.preventDefault()
        onAddNote(noteToAdd)
        setFormSubmitted(!formSubmitted)
        resetForm()
        // navigate('/note')
    }
       

function resetForm() {
    setNoteToAdd(noteService.getEmptyNote())
    setFormSubmitted(!formSubmitted)
}


return (
    <section tabindex="0" className='add-note'>

        <h2>Take a note...</h2>
        <form onSubmit={onSubmitNote}>
            <label htmlFor='title'></label>
            <input
                value={noteToAdd.info.title}
                onChange={handleChange}
                type='text'
                placeholder='Title'
                id='title'
                name='title'
                className='title-input'
            />

            <label htmlFor='txt'></label>
            {noteToAdd.type !== 'NoteTodos' && <input
                value={noteToAdd.info.txt}
                onChange={handleChange}
                type='text'
                placeholder='Take a note...'
                id='txt'
                name='txt'
            />}

            {/* {noteToAdd.type === 'NoteTodos' && (
                        <div className='edit-note-todos'>
                            <label htmlFor='todos'>Todos:</label>
                            <ul>
                                {noteToAdd.info.todos.map((todo, index) => (
                                    <li key={index}>
                                        <input
                                            type='text'
                                            value={todo.txt}
                                            onChange={(e) => {
                                                const updatedTodos = [...noteToAdd.info.todos];
                                                updatedTodos[index].txt = e.target.value;
                                                setNoteToAdd((prevNoteToAdd) => ({
                                                    ...prevNoteToAdd,
                                                    info: {
                                                        ...prevNoteToAdd.info,
                                                        todos: updatedTodos,
                                                    },
                                                }));
                                            }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )} */}




            <button className="save-btn" >Save</button>
        </form>
        {/* <button className="close-btn" onClick={onBack}>Back</button> */}
    </section>
)
    }
