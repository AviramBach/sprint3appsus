import { MailPreview } from './MailPreview.jsx'
const { useNavigate } = ReactRouterDOM


export function MailList({ mails, onRemoveMail, criteria, onMarkRead, setCompose, onMarkStar }) {

    return <ul className="mail-list">
        {(!mails.length) && <h2>No mails found</h2>}
        {mails.map(mail => (
            <li key={mail.id}>
                <MailPreview mail={mail} onRemoveMail={onRemoveMail} criteria={criteria} onMarkRead={onMarkRead} setCompose={setCompose} onMarkStar={onMarkStar} />
            </li>
        ))}
    </ul>
}
