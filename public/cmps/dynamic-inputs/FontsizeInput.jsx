export function FontsizeInput({ name, onSetFooterStyle, fontSize }) {

    function onSetFontSize({ target }) {
        const { value } = target
        onSetFooterStyle({ fontSize: value + 'px' })
    }

    return (
        <section className="fontsize-input">
            <div className="items-container">
                <label htmlFor="">{fontSize}</label>
                <input
                    value={parseInt(fontSize)}
                    type="range"
                    min={14}
                    max={26}
                    onChange={onSetFontSize}
                />
            </div>
            <h3>Hello {name}! pick a font size!</h3>
        </section>
    )

}