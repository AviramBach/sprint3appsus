export function NotePreview({ note }) {
    return (
      <article className='note-preview'>
        <h2>{note.info.title}</h2> 
        <h2>{note.info.txt}</h2>
      </article>
    )
  }
  