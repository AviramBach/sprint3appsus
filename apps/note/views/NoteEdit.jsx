import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM



export function NoteEdit() {
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
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
            noteService
                .save(noteToAdd)
                .then(() => {
                    //   showSuccessMsg(`Note saved successfully`)
                    navigate('/note')
                })
                .catch(err => {
                    console.log('err:', err)
                    //   showErrorMsg("Couldn't save note")
                })
        }

        function onBack() {
            navigate('/note')
        }

        return (
            <section className='add-note'>

                <h2>Your note</h2>
                <form onSubmit={onSubmitNote}>
                    <label htmlFor='title'>Title: </label>
                    <input
                        value={noteToAdd.title}
                        onChange={handleChange}
                        type='text'
                        placeholder='Title'
                        id='title'
                        name='title'
                    />

                    <label htmlFor='txt'>Text:</label>
                    <input
                        value={noteToAdd.text}
                        onChange={handleChange}
                        type='text'
                        placeholder='text'
                        id='txt'
                        name='txt'
                    />

                    {noteToAdd.type === 'NoteTodos' && (
                        <div>
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
                    )}




                    <button>Save</button>
                </form>
                <button className="close-btn" onClick={onBack}>Back</button>
            </section>
        )
    }
