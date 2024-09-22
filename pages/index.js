import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://your-api-url/bfhl', JSON.parse(jsonInput));
      setResponse(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions(prev =>
      checked ? [...prev, value] : prev.filter(option => option !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    return (
      <div>
        {selectedOptions.includes('Numbers') && <div>Numbers: {JSON.stringify(numbers)}</div>}
        {selectedOptions.includes('Alphabets') && <div>Alphabets: {JSON.stringify(alphabets)}</div>}
        {selectedOptions.includes('Highest lowercase alphabet') && <div>Highest Lowercase Alphabet: {JSON.stringify(highest_lowercase_alphabet)}</div>}
      </div>
    );
  };

  return (
    <div>
      <h1>ABCD123</h1> {/* Replace with your roll number */}
      <form onSubmit={handleSubmit}>
        <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <label>
            <input type="checkbox" value="Numbers" onChange={handleOptionChange} />
            Numbers
          </label>
          <label>
            <input type="checkbox" value="Alphabets" onChange={handleOptionChange} />
            Alphabets
          </label>
          <label>
            <input type="checkbox" value="Highest lowercase alphabet" onChange={handleOptionChange} />
            Highest Lowercase Alphabet
          </label>
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default Home;
