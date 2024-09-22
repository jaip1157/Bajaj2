import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('https://your-backend-url/bfhl', parsedInput);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON or API error');
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    return (
      <div>
        {selectedOptions.includes('Numbers') && <div>Numbers: {JSON.stringify(numbers)}</div>}
        {selectedOptions.includes('Alphabets') && <div>Alphabets: {JSON.stringify(alphabets)}</div>}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>Highest Lowercase Alphabet: {JSON.stringify(highest_lowercase_alphabet)}</div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>ABCD123</h1> {/* Replace with your roll number */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON here'
        />
        <button type='submit'>Submit</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>
          <input
            type='checkbox'
            value='Numbers'
            onChange={handleOptionChange}
          />
          Numbers
        </label>
        <label>
          <input
            type='checkbox'
            value='Alphabets'
            onChange={handleOptionChange}
          />
          Alphabets
        </label>
        <label>
          <input
            type='checkbox'
            value='Highest lowercase alphabet'
            onChange={handleOptionChange}
          />
          Highest lowercase alphabet
        </label>
      </div>
      {renderResponse()}
    </div>
  );
}
