import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function MailCompose({ setCompose }) {
    const [mailToAdd, setMailToAdd] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()
    const params = useParams()
    console.log(mailToAdd)
    // console.log(setCompose)
    useEffect(() => {
        if (params.mailId) loadmail()
    }, [])

    function loadmail() {
        console.log('laoding mail')
        mailService.get(params.mailId)
            .then(setMailToAdd)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        console.log('field', field)
        console.log('value', value)
        setMailToAdd(prevMailToAdd => ({ ...prevMailToAdd, [field]: value }))
    }

    function onSubmitMail(ev) {
        ev.preventDefault()
        console.log(mailToAdd.id)
        mailService.save(mailToAdd)
            .then(() => {
                // showSuccessMsg(`mail saved successfully`)
                console.log('mail saved successfully')
                setCompose(false)
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
                <button className="btn-compose-close" onClick={() => setCompose(false)}><i class="fa-solid fa-xmark"></i></button>
            </div>
            <form>
                <input
                    value={mailToAdd.to}
                    onChange={handleChange}
                    type='text'
                    placeholder='To'
                    name='to'
                    required
                />
                <input
                    value={mailToAdd.subject}
                    onChange={handleChange}
                    type='text'
                    placeholder='Subject'
                    name='subject'
                    required
                />
                <input
                    className="mail-compose-body"
                    value={mailToAdd.body}
                    onChange={handleChange}
                    type='text'
                    name='body'
                />
                <div className="compose-footer">
                    <button className="btn-send" onClick={onSubmitMail}>Send</button>
                </div>
            </form>
        </section>
    )
}