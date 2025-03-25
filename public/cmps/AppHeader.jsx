import { eventBusService } from "../services/event-bus.service.js"

const { useEffect } = React
const { Link, NavLink, useNavigate } = ReactRouterDOM
export function AppHeader() {

    const navigate = useNavigate()
    useEffect(() => {
        // eventBusService.on('stam', value => {
        //     console.log('value:', value)
        // })

        return () => {

        }
    }, [])

    function onBack() {
        navigate(-1)
    }

    return (
        <header className="app-header full main-layout">
            <section>
                <h1>React Car App</h1>
                <section>
                    <button onClick={onBack}>Back</button>
                </section>
                <nav className="app-nav">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/car">Cars</NavLink>
                </nav>
            </section>
        </header>
    )
}