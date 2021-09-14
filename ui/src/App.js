import {useState, useEffect} from "react";
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

const App = () => {
  const [json, setJson] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!json) {
      fetch('http://localhost:4000/strings')
        .then(r => r.json())
        .then(data => setJson(data));
      }
    }, []);  


    if (!json) return <p>Loading...</p>

const handleUpdate = (data) => {
  setError(false);
  try {
    JSON.stringify(data);
  } catch (error) {
    setError(true);
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
};
  fetch('http://localhost:4000/strings', requestOptions)
    .then(() => console.info('Updated Strings file'));
}

  return (
    <div className="App">
      {error && <p>Error validating</p>}
      <Editor value={json} onChange={handleUpdate} />
    </div>
  );
}

export default App;
