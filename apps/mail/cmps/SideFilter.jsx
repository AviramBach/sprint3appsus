const { useState, useEffect } = React

export function SideFilter({ criteria, onSetCriteria, mailsLength }) {
    const [criteriaFrom, setCriteria] = useState(criteria)
    useEffect(() => {
        onSetCriteria(criteriaFrom)
    }, [criteriaFrom])

    function setCriteriaStatus(folder) {
        criteria.status = folder
        setCriteria(criteria)
    }

    return (
        <section className="side-filter">
            <button className={`btn-inbox ${(criteriaFrom.status === 'inbox') ? 'selected' : ''}`} onClick={() => setCriteriaStatus('inbox')}><i class="fa-solid fa-inbox"></i> <span>{(criteriaFrom.status === 'inbox') && ` Inbox ${mailsLength}`}</span></button>
            <button className={`btn-sent ${(criteriaFrom.status === 'sent') ? 'selected' : ''}`} onClick={() => setCriteriaStatus('sent')}><i class="fa-regular fa-paper-plane"></i><span>{(criteriaFrom.status === 'sent') && ` Sent ${mailsLength}`}</span></button>
            <button className={`btn-draft ${(criteriaFrom.status === 'draft') ? 'selected' : ''}`} onClick={() => setCriteriaStatus('draft')}><i class="fa-regular fa-file"></i><span>{(criteriaFrom.status === 'draft') && ` Drafts ${mailsLength}`}</span></button>
            <button className={`btn-trash ${(criteriaFrom.status === 'trash') ? 'selected' : ''}`} onClick={() => setCriteriaStatus('trash')}><i class="fa-solid fa-trash-can"></i><span>{(criteriaFrom.status === 'trash') && ` Trash ${mailsLength}`}</span></button>
        </section>
    )
}