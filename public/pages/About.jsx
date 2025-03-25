import { Accordion } from "../cmps/Accordion.jsx"
import { eventBusService } from "../services/event-bus.service.js"

const { Link, Outlet } = ReactRouterDOM
const { useState } = React

export function About() {

    const [cmpType, setCmpType] = useState('hello')

    const sectionStyle = {
        fontSize: '22px',
        border: '1px solid red',
        padding: '0.5em',
        marginBlock: '10px'
    }

    function handleGreetClick(value) {
        console.log(`${value} Click!`)
    }

    return (
        <section className="about">
            <h1>About cars and us...</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio dolore sapiente, iste animi corporis nisi atque tempora assumenda dolores. Nobis nam dolorem rerum illo facilis nemo sit voluptatibus laboriosam necessitatibus!</p>

            <section style={{ marginBlock: '20px' }}>
                <Accordion title="Introduction to Quantum Computing">
                    Quantum computing is an area of computing focused on developing computer
                    technology based on the principles of quantum theory. Quantum computers use
                    qubits, which can represent and store data in multiple states simultaneously.
                </Accordion>
                <Accordion title="Understanding Machine Learning">
                    <span>👻</span>Machine learning is a subset of artificial
                    intelligence that focuses on building systems that learn from data,
                    improve their performance over time without being explicitly programmed,
                    and make decisions based on data patterns. <br />
                    <p>We Want YOU 🫵🏼</p>
                </Accordion>
            </section>

            <select value={cmpType} onChange={ev => setCmpType(ev.target.value)}>
                <option>hello</option>
                <option>goodbye</option>
                <option>welcomeBack</option>
            </select>

            <section className="dynamic-cmps" style={sectionStyle}>
                <DynamicCmp cmpType={cmpType} name="Popo" handleClick={handleGreetClick} age={50} />
                {/* {cmpType === 'hello' && <Hello name="Popo" handleClick={handleGreetClick} />}
                {cmpType === 'goodbye' && <GoodBye name="Popo" handleClick={handleGreetClick} />}
                {cmpType === 'welcomeBack' && <WelcomeBack name="Popo" handleClick={handleGreetClick} />} */}
            </section>

            <nav>
                <Link replace to="/about/team">Team</Link>
                <Link replace to="/about/vision">Vision</Link>
            </nav>

            <section>
                <Outlet />
            </section>
        </section>
    )
}

function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'hello':
            return <Hello {...props} />
        case 'goodbye':
            return <GoodBye {...props} />
        case 'welcomeBack':
            return <WelcomeBack {...props} />
        default:
            return null
    }
}


function Hello({ name, handleClick, age }) {
    return <h1 onClick={() => handleClick('Hello')}>Hello there {name},  you are {age}</h1>
}

function GoodBye({ name, handleClick, age }) {
    return <h1 onClick={() => handleClick('Good Bye')}>Bye {name},  you are {age}</h1>
}

function WelcomeBack({ name, handleClick, age }) {
    return <h1 onClick={() => handleClick('Welcome Back')}>Welcome back {name},  you are {age}</h1>
}


