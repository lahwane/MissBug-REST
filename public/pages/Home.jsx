import { LongTxt } from "../cmps/LongTxt.jsx"
import { utilService } from "../services/util.service.js"

const { useRef } = React
export function Home() {

    const h1Ref = useRef()
    const imgRef = useRef()

    function onActivate() {
        utilService.animateCSS(h1Ref.current, 'rubberBand')
            .then(() => {
                utilService.animateCSS(imgRef.current, 'bounceOut', false)
            })

    }

    const homeAttributes = {
        className: 'home',
        title: 'home sweet home',
        baba: 100
    }

    const props = {
        num: 100,
        name: 'Popo'
    }

    return (
        <section {...homeAttributes}>
            <button onClick={onActivate}>Activate</button>
            <h1 ref={h1Ref} >Car's R Us!</h1>
            <img ref={imgRef} src="../assets/img/react.png" alt="" />
            <SomeCmp {...props} />
            <AnotherTestCmp>
                HEY im a test cmp
                <div>Im a div</div>
                <p>🍎</p>
            </AnotherTestCmp>
            <LongTxt length={50}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis neque aut praesentium quam illo eum saepe voluptatem?
                Perferendis earum error minima repellendus, architecto, maiores iste est
                modi laudantium harum eveniet.
            </LongTxt>
        </section>
    )
}


function AnotherTestCmp({ children }) {
    // console.log('props:', props)
    return (
        <section>
            <h2>Some Title</h2>
            {children}
        </section>
    )
}



function SomeCmp(props) {
    console.log('props:', props)
    return <span></span>
}
