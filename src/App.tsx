import './App.css'
import ResultForm from './components/ResultForm';
import URLForm from './components/urlform'
import { useState } from 'react'

function App() {
  const [shortUrl, setShortUrl] = useState("");

  function updateShortUrl(url: string) {
    setShortUrl(url)
  }

  let content;
  if (shortUrl == "") {
    content = <URLForm urlUpdater={updateShortUrl} />
  } else {
    content = <ResultForm shortUrl={shortUrl} />
  }

  return (
    <div>
      <h1>Bem vindo</h1>
      {content}
    </div>
  )
}

export default App
