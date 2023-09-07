const { useState, useEffect } = React

export function SideFilter({ criteria, onSetCriteria }) {
    console.log(criteria)
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
            <button className="btn-inbox" onClick={() => setCriteriaStatus('inbox')}>Inbox</button>
            <button className="btn-sent" onClick={() => setCriteriaStatus('sent')}>Sent</button>
        </section>
    )
}