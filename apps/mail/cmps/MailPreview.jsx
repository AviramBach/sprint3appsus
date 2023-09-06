import { LongTxt } from '../../../cmps/LongTxt.jsx'

export function MailPreview({ mail }) {
    // console.log(mail)
    const { subject, body, isRead, from, sentAt } = mail
    const date = `${new Date(sentAt).getDate()}/${new Date(sentAt).getMonth()}/${new Date(sentAt).getFullYear()}`
    const hour = `${new Date(sentAt).getHours()}:${new Date(sentAt).getMinutes()}`
    return (
        <section className="mail-preview">
            {/* <button className={`btn-read ${(isRead) ? 'read' : 'unread'}`}>▢</button> */}
            <button className={`btn-star ${(isRead) ? 'read' : 'unread'}`}>☆</button>
            <span>{from}</span>
            <span>{subject}</span>
            <LongTxt txt={body} length={body.length} />
            <span className='time-span'>{(Date.now() - sentAt > 100000000) ? date : hour}</span>
            <section className='mail-controls'>
                <button>🗑</button>
                <button className='btn-read'>{(isRead)? 'o':'✉'}</button>
            </section>
        </section>)
}