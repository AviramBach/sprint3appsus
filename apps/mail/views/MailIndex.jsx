import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { SideFilter } from '../cmps/SideFilter.jsx'
import { TopFilter } from '../cmps/TopFilter.jsx'
import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [isCompose, setCompose] = useState(false)
    const [criteria, setCriteria] = useState(mailService.getDefaultCriteria())
    useEffect(() => {
        mailService.query(criteria).then(mails => {
            setMails(mails)
        })
    }, [criteria, isCompose])

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
                console.log(`Mail Removed! ${mailId}`)
                // showSuccessMsg(`Mail Removed! ${mailId}`)
            })
            .catch(err => {
                console.error(err)
                // showErrorMsg(`Problem Removing ${mailId}`)
            })
    }

    function onSetCriteria(criteria) {
        console.log('setCriteria', criteria)
        setCriteria(prevCriteria => ({ ...prevCriteria, ...criteria }))
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className='mail-index'>
            <button className='btn-compose' onClick={() => setCompose(!isCompose)}>✎</button>
            <TopFilter criteria={criteria} onSetCriteria={onSetCriteria} />
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
            <SideFilter criteria={criteria} onSetCriteria={onSetCriteria} />
            {isCompose && <MailCompose setCompose={setCompose} />}
        </section>)
}

