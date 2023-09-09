export function NotePreview({ note }) {
    
  return (
        <article  className='note-preview'>
        {note && (
          <div >
            {note.type === 'NoteTxt' && note.info && note.info.title && (
              <h3>{note.info.title}</h3>
            )}
            {(note.type === 'NoteImg' || note.type === 'NoteTodos') && note.info && note.info.title && (
              <h3>{note.info.title}</h3>
            )}
            {note.type === 'NoteTxt' && note.info && note.info.txt && (
              <p>{note.info.txt}</p>
            )}
            {note.type === 'NoteTodos' && note.info && note.info.todos && (
              <ul>
                {note.info.todos.map(((todo, index) => (
                  <li key={index}>{todo.txt}</li>
                )))}
              </ul>
            )}
          </div>
        )}
      </article>
    )
  }
  