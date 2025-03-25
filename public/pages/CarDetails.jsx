const { useParams, Link } = ReactRouterDOM

import { carService } from "../services/car.service.js"

const { useEffect, useState } = React

export function CarDetails() {

    const [car, setCar] = useState(null)

    const { carId } = useParams()

    useEffect(() => {
        loadCar()
    }, [carId])


    function loadCar() {
        carService.get(carId)
            .then(car => setCar(car))
    }

    if (!car) return <div>Loading...</div>
    return (
        <section className="car-details">
            <h1>Vendor: {car.vendor} 🚗</h1>
            <h1>Speed: {car.speed} KMH</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            <button ><Link to="/car">Back</Link></button>
        </section>
    )
}