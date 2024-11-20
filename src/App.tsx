import './App.css'

function App() {
  return (
    <div>
      <h1>Tá perdido fi?</h1>
      <URLForm />
    </div>
  )
}

function URLForm() {
  const isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get('url') as string;
    if (!isValidURL(url)) {
      alert('URL inválida!')
    }

    const requiresConfirmation = formData.get('requiresConfirmation') == 'on';
    console.log(url, requiresConfirmation);
  };

  return (
    <form className='inputForm' onSubmit={handleSubmit}>
      <label className='inputLabel'>
        Endereço URL:
        <input type="text" name="url" placeholder="https://exemplo.com" required/>
        </label>
        <label className='inputLabel'>
          Exibir página de confirmação antes de redirecionar
          <input type='checkbox' id='confirmCheckbox' name='requiresConfirmation' />
        </label>
      <input type="submit" value="ENCURTAR" className='prettyButtom'/>
    </form>
  )
}

export default App
