import { MailList } from '../cmps/MailList.jsx'
import { SideFilter } from '../cmps/SideFilter.jsx'
import { TopFilter } from '../cmps/TopFilter.jsx'
import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [criteria, setCriteria] = useState(mailService.getDefaultCriteria())
    useEffect(() => {
        mailService.query(criteria).then(mails => {
            setMails(mails)
        })
    }, [criteria])

    function onSetCriteria(criteria){
        console.log('setCriteria', criteria)
        setCriteria(prevCriteria => ({...prevCriteria, ...criteria}))
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className='mail-index'>
            <TopFilter criteria={criteria} onSetCriteria={onSetCriteria}/>
            <MailList mails={mails} />
            <SideFilter />
        </section>)
}

