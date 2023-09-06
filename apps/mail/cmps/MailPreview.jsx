import { LongTxt } from '../../../cmps/LongTxt.jsx'

export function MailPreview({ mail }) {
    // console.log(mail)
    const { subject, body, isRead, from, sentAt } = mail
    return (
        <section className="mail-preview">
            <button className={`btn-read ${(isRead) ? 'read' : 'unread'}`}>▢</button>
            <button className="btn-star">☆</button>
            <span>{from}</span>
            <span>{subject}</span>
            <LongTxt txt={body} length={body.length} />
            {/* <span>{body}</span> */}
            <span>{sentAt}</span>
        </section>)
}