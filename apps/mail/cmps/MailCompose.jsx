import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function MailCompose() {
    const [mailToAdd, setMailToAdd] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()
    const params = useParams()
    console.log(mailToAdd)
    useEffect(() => {
        if (params.mailId) loadmail()
    }, [])

    function loadmail() {
        console.log('laoding mail')
        mailService.get(params.mailId)
            .then(setMailToAdd)
            .catch(err => console.log('err:', err))
    }

    function onSubmitMail(ev) {
        ev.preventDefault()
        mailService
            .save(mailToAdd)
            .then(() => {
                // showSuccessMsg(`mail saved successfully`)
                navigate('/mail')
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg("Couldn't save mail")
            })
    }


    return (
        <section className="mail-compose">
            <div className="compose-header">
                <h2>New Email</h2>
                <button className="btn-compose-close">X</button>
            </div>
            <form action="">
                <input type="text" placeholder="To:" />
                <input type="text" placeholder="Subject" />
                <input type="text" />
            </form>
            <div className="compose-footer">
                <button className="btn-send">Send</button>
            </div>
        </section>
    )
}