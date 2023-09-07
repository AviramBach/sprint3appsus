import { LongTxt } from '../../../cmps/LongTxt.jsx'

const { Link, useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail }) {
    const { id, subject, body, isRead, from, sentAt, isStared } = mail
    const navigate = useNavigate()
    const date = `${new Date(sentAt).getDate()}/${new Date(sentAt).getMonth()}/${new Date(sentAt).getFullYear()}`
    const hour = `${new Date(sentAt).getHours()}:${new Date(sentAt).getMinutes()}`
    return (
        <section className="mail-preview">
            <button className={`btn-star ${(isStared) ? 'stared' : 'unstared'}`}></button>
            <span onClick={() => navigate(id)} className={`${(isRead) ? 'read' : 'unread'}`}>{from}</span>
            <span onClick={() => navigate(id)} className={`${(isRead) ? 'read' : 'unread'}`}>{subject}</span>
            <span className={`long-txt ${(isRead) ? 'read' : 'unread'}`} onClick={() => navigate(id)}>
                <LongTxt txt={body} length={body.length} />
            </span>
            <span className={`time-span ${(isRead) ? 'read' : 'unread'}`} onClick={() => navigate(id)}>{(Date.now() - sentAt > 10000000) ? date : hour}</span>
            <section className='mail-controls'>
                <button className='btn-remove' onClick={() => onRemoveMail(id)}>🗑</button>
                <button className='btn-read'>{(isRead) ? '👁' : '✉'}</button>
            </section>
        </section>)
}