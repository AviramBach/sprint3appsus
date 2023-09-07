import { mailService } from "../services/mail.service.js"


const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    
    console.log(mail)
    useEffect(() => {
        mailService.get(mailId)
          .then(setMail)
          .catch(err => {
            console.log('err:', err)
            navigate('/mail')
          })
      }, [mailId])
    
    function onBack() {
        navigate('/mail')
    }

    if (!mail) return <div>Loading...</div>

    const date = `${new Date(mail.sentAt).getDate()}/${new Date(mail.sentAt).getMonth()}/${new Date(mail.sentAt).getFullYear()}`
    const hour = `${new Date(mail.sentAt).getHours()}:${new Date(mail.sentAt).getMinutes()}`

    return (
        <section className="mail-details">
            <button onClick={onBack}>←</button>
            <h2>{mail.subject} <span>{(Date.now() - mail.sentAt > 10000000) ? date : hour}</span></h2>
            <h3>{mail.from}</h3>
            <h4>{mail.to}</h4>
            <p>{mail.body}</p>
        </section>
    )
}