import { LongTxt } from '../../../cmps/LongTxt.jsx'

const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail }) {
    const { id, subject, body, isRead, from, sentAt } = mail
    const date = `${new Date(sentAt).getDate()}/${new Date(sentAt).getMonth()}/${new Date(sentAt).getFullYear()}`
    const hour = `${new Date(sentAt).getHours()}:${new Date(sentAt).getMinutes()}`
    return (
        <section className="mail-preview">
            <button className={`btn-star ${(isRead) ? 'read' : 'unread'}`}>☆</button>
            <span>{from}</span>
            <span>{subject}</span>
            <LongTxt txt={body} length={body.length} />
            <span className='time-span'>{(Date.now() - sentAt > 10000000) ? date : hour}</span>
            <section className='mail-controls'>
                <button className='btn-remove' onClick={() => onRemoveMail(id)}>🗑</button>
                <button className='btn-read'>{(isRead) ? '👁' : '✉'}</button>
                <button>
                    <Link to={`/mail/${id}`}>Open</Link>
                </button>
            </section>
        </section>)
}