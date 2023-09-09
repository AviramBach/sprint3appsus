import { LongTxt } from '../../../cmps/LongTxt.jsx'

const { useSearchParams, useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail, criteria, onMarkRead, setCompose, onMarkStar }) {
    const currFolder = criteria.status
    const { id, subject, body, isRead, from, to, sentAt, isStared } = mail
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    function openDraftMail(mailId) {
        // console.log(mailId)
        // console.log(searchParams)
        setSearchParams({ id: mailId })
        setCompose(true)
    }

    const date = `${new Date(sentAt).getDate()}.${new Date(sentAt).getMonth()}.${new Date(sentAt).getFullYear()}`
    const minutes = new Date(sentAt).getMinutes()
    const hour = `${new Date(sentAt).getHours()}:${(minutes < 10) ? `0${minutes}` : minutes}`
    return (
        <section className="mail-preview">
            {!isStared && <button className='btn-star unstared' onClick={() => onMarkStar(id)}><i class="fa-regular fa-star"></i></button>}
            {isStared && <button className='btn-star stared' onClick={() => onMarkStar(id)}><i class="fa-solid fa-star"></i></button>}
            {(currFolder !== 'draft') && <span onClick={() => navigate(id)} className={`${(isRead) ? 'read' : 'unread'}`}>{(currFolder === 'inbox' || currFolder === 'trash') ? from : to}</span>}
            {(currFolder === 'draft') && <span onClick={() => openDraftMail(id)} className='read draft'>{'Draft'}</span>}
            {/* <span onClick={() => (currFolder !== 'draft') ? navigate(id) : openDraftMail(id)} className={`${(isRead) ? 'read' : 'unread'}`}>{(currFolder === 'inbox' || currFolder === 'trash') ? from : to}</span> */}
            <span onClick={() => (currFolder !== 'draft') ? navigate(id) : openDraftMail(id)} className={`${(isRead) ? 'read' : 'unread'}`}>{subject}</span>
            <span className={`long-txt ${(isRead) ? 'read' : 'unread'}`} onClick={() => (currFolder !== 'draft') ? navigate(id) : openDraftMail(id)}>
                <LongTxt txt={body} length={body.length} />
            </span>
            <span className={`time-span ${(isRead) ? 'read' : 'unread'}`} onClick={() => (currFolder !== 'draft') ? navigate(id) : openDraftMail(id)}>{(Date.now() - sentAt > 10000000) ? date : hour}</span>
            <section className='mail-controls'>
                <button className='btn-remove' onClick={() => onRemoveMail(id)}><i class="fa-regular fa-trash-can"></i></button>
                {!isRead && currFolder !== 'draft' && <button className='btn-read' onClick={() => onMarkRead(id)}><i class="fa-regular fa-envelope"></i></button>}
                {isRead && currFolder !== 'draft' && <button className='btn-read' onClick={() => onMarkRead(id)}><i class="fa-regular fa-envelope-open"></i></button>}
            </section>
        </section>)
}