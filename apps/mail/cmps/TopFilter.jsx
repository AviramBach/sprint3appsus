const { useState, useEffect } = React

export function TopFilter({ criteria, onSetCriteria }) {
    const { criteriaFrom, setCriteria } = useState(criteria)
    console.log(criteria)
    useEffect(() => {
        onSetCriteria(criteriaFrom)
    }, [criteriaFrom])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        console.log(field, value)
        // setCriteria(prevCriteria => ({ ...prevCriteria, [field]: value }))
    }

    return (
        <section className="top-filter">
            <input type="text" placeholder="Search" />
            <select name="sort" id="sort">
                <option value="date">Date</option>
                <option value="name">Name</option>
            </select>
            <select name="filter" id="filter" onChange={handleChange}>
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="star">Star</option>
            </select>
        </section>
    )
}