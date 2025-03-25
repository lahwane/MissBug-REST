const { Link } = ReactRouterDOM

import { CarPreview } from "./CarPreview.jsx";

export function CarList({ cars, onRemoveCar }) {

    return (
        <ul className="car-list">
            {cars.map(car =>
                <li key={car._id}>
                    <CarPreview car={car} />
                    <section>
                        <button onClick={() => onRemoveCar(car._id)}>Remove</button>
                        <button><Link to={`/car/${car._id}`}>Details</Link></button>
                        <button><Link to={`/car/edit/${car._id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}