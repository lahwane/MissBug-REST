import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function CarFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter, 700))

    useEffect(() => {
        onSetFilterDebounce.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { txt, minSpeed } = filterByToEdit

    return (
        <section className="car-filter">
            <h2>Filter Our Cars</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Vendor</label>
                <input value={txt} onChange={handleChange} name="txt" type="text" id="txt" />

                <label htmlFor="minSpeed">Min Speed</label>
                <input value={minSpeed || ''} onChange={handleChange} name="minSpeed" type="number" id="minSpeed" />

                <button>Submit</button>
            </form>
        </section>
    )
}