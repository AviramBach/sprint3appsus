import { mailService } from "../services/mail.service.js"


const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        mailService.get(mailId)
            .then((mail) => {
                mail.isRead = true
                mailService.save(mail)
                setMail(mail)
            })
            .catch(err => {
                console.log('err:', err)
                navigate('/mail')
            })
    }, [mailId])

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => navigate('/mail'))
            .catch(err => {
                console.error(err)
                // showErrorMsg(`Problem Removing ${mailId}`)
            })
    }

    function onMarkStar(mailId) {
        mailService.get(mailId)
            .then((mail) => {
                mail.isStared = !mail.isStared
                mailService.save(mail)
                setMail(mail)
            })
            .catch(err => {
                console.log('err:', err)
                navigate('/mail')
            })
    }

    function onBack() {
        navigate('/mail')
    }

    if (!mail) return <div>Loading...</div>
    const date = `${new Date(mail.sentAt).getDate()}/${new Date(mail.sentAt).getMonth()}/${new Date(mail.sentAt).getFullYear()}`
    const minutes = new Date(mail.sentAt).getMinutes()
    const hour = `${new Date(mail.sentAt).getHours()}:${(minutes < 10) ? `0${minutes}` : minutes}`

    return (
        <section className="mail-details">
            <section className="mail-header">
                <button onClick={onBack}><i class="fa-solid fa-arrow-left"></i></button>
                <button className='btn-remove' onClick={() => onRemoveMail(mailId)}><i class="fa-regular fa-trash-can"></i></button>
            </section>
            <section className="mail-subject">
                <h2>{mail.subject}</h2>
                <p>{(Date.now() - mail.sentAt > 10000000) ? date : hour}</p>
            </section>
            <h3>{mail.from}</h3>
            {!mail.isStared && <button className='btn-star unstared' onClick={() => onMarkStar(mailId)}><i class="fa-regular fa-star"></i></button>}
            {mail.isStared && <button className='btn-star stared' onClick={() => onMarkStar(mailId)}><i class="fa-solid fa-star"></i></button>}
            <h4>{mail.to}</h4>
            <p>{mail.body}</p>
        </section>
    )
}