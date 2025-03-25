const { Link, useSearchParams } = ReactRouterDOM
import { CarFilter } from "../cmps/CarFilter.jsx";
import { CarList } from "../cmps/CarList.jsx";
import { carService } from "../services/car.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

const { useEffect, useState } = React

export function CarIndex() {
    const [cars, setCars] = useState(null)
    const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())

    useEffect(() => {
        loadCars()
    }, [filterBy])

    function loadCars() {
        console.log('Loading Cars...')
        carService.query(filterBy)
            .then(cars => {
                setCars(cars)
            })
            .catch(err => {
                showErrorMsg('Cannot load cars')
                console.log('err:', err)
            })
    }

    function onRemoveCar(carId) {
        carService.remove(carId)
            .then(() => {
                setCars(cars =>
                    cars.filter(car => car._id !== carId)
                )
                showSuccessMsg(`Car (${carId}) removed successfully!`)
            })
            .catch(err => {
                showErrorMsg(`Cannot remove car`)
                console.log('Problems removing car:', err)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSetPage(diff) {
        setFilterBy(prevFilter => ({ ...prevFilter, pageIdx: prevFilter.pageIdx + diff }))
    }



    if (!cars) return <div>Loading...</div>

    return (
        <section className="car-index">
            <button><Link to="/car/edit">Add Car</Link></button>

            <CarFilter filterBy={filterBy} onSetFilter={onSetFilter} />

            <CarList
                cars={cars}
                onRemoveCar={onRemoveCar}
            />
            <label>
                Use Paging
                <input type="checkbox" onChange={(ev)=>{
                  setFilterBy(prevFilter => ({ ...prevFilter, pageIdx:  ev.target.checked? 0 : undefined}))  
                }} />
            </label>

            <div hidden={filterBy.pageIdx === undefined}>
                <button disabled={filterBy.pageIdx === 0} onClick={() => { onSetPage(-1) }}>Prev Page</button>
                <span>Page: {filterBy.pageIdx + 1 }</span>
                <button onClick={() => { onSetPage(1) }}>Next Page</button>
            </div>  

        </section>
    )


}