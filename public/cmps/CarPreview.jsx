
export function CarPreview({ car }) {

    const { vendor, speed } = car
    return (
        <article className="car-preview">
            <h2>Vendor: {vendor}</h2>
            <h4>Car Speed: {speed}</h4>
            <p className="car-emoji">🚗</p>
            {/* <img src={`../assets/img/${car.vendor.toLowerCase()}.png`} alt="" /> */}
        </article>
    )
}