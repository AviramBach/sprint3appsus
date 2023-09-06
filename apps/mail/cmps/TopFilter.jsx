const { useState, useEffect } = React

export function TopFilter({ criteria, onSetCriteria }) {
    const [criteriaFrom, setCriteria] = useState(criteria)
    console.log(criteriaFrom)
    useEffect(() => {
        onSetCriteria(criteriaFrom)
    }, [criteriaFrom])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        console.log(field, value)
        setCriteria(prevCriteria => ({ ...prevCriteria, [field]: value }))
    }


    return (
        <section className="top-filter">
            <input type="text" placeholder="Search" name="txt" onChange={handleChange} />
            <select name="sort" id="sort" onChange={handleChange}>
                <option value="date">Date</option>
                <option value="name">Name</option>
            </select>
            <select name="filter" id="filter" onChange={handleChange}>
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
                <option value="star">Star</option>
            </select>
        </section>
    )
}