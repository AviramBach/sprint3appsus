import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useNavigate, useSearchParams } = ReactRouterDOM

export function MailCompose({ setCompose }) {
    const [mailToAdd, setMailToAdd] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    // console.log(mailToAdd)
    // console.log(setCompose)
    useEffect(() => {
        // console.log(searchParams.get('id'))
        if (searchParams.get('id')) {
            const mailId = searchParams.get('id')
            loadmail(mailId)
        }
    }, [])

    function loadmail(mailId) {
        // console.log('laoding mail')
        mailService.get(mailId)
            .then(setMailToAdd)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        // console.log('field', field)
        // console.log('value', value)
        setMailToAdd(prevMailToAdd => ({ ...prevMailToAdd, [field]: value }))
    }

    function onSubmitMail(ev) {
        ev.preventDefault()
        // console.log(mailToAdd.sentAt)
        // console.log(mailToAdd.isDraft)
        mailToAdd.isDraft = false
        mailToAdd.sentAt = Date.now()
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

    function onSetDraft() {
        // mailToAdd.sentAt = ''
        mailService.save(mailToAdd)
            .then(() => {
                // showSuccessMsg(`mail saved successfully`)
                console.log('mail saved to drafts')
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
                <button className="btn-compose-close" onClick={() => onSetDraft()}><i class="fa-solid fa-xmark"></i></button>
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