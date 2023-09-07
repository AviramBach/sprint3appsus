import { MailPreview } from './MailPreview.jsx'
const { useNavigate } = ReactRouterDOM


export function MailList({ mails, onRemoveMail }) {

    return <ul className="mail-list">
        {mails.map(mail => (
            <li key={mail.id}>
                <MailPreview mail={mail} onRemoveMail={onRemoveMail} />
            </li>
        ))}
    </ul>
}
