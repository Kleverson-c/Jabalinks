type ResultFormProps = {
    shortUrl: string
}

function ResultForm({shortUrl}: ResultFormProps) {

    function anotherOne() {
        shortUrl = "";
        window.location.href = "/";
    }

    return (
        <form>
            <label>
                Endereço encurtado:
                <input type="text" readOnly value={shortUrl} />
            </label>
            <p>Esse endereço ficará disponível por 24 horas</p>
            <button className='prettyButtom' onClick={anotherOne}>
                <img
                src="static/another-one-312x359.png"
                />
            </button>
        </form>
    )
}

export default ResultForm;