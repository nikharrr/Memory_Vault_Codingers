import { useState, useEffect } from 'react';

function SearchPage({ searchQuery }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      // Simulate fetching search results based on the query
      const fetchResults = () => {
        const data = [
          { id: 1, title: 'Memory 1', description: 'This is the first memory.' },
          { id: 2, title: 'Memory 2', description: 'This is the second memory.' },
          { id: 3, title: 'Memory 3', description: 'This is the third memory.' },
        ];
        
        const filteredResults = data.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setResults(filteredResults);
      };

      fetchResults();
    }
  }, [searchQuery]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-white mb-4">Search Results</h1>
      
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map(result => (
            <div key={result.id} className="bg-[#1c1c1c] p-4 rounded-2g text-white">
              <h2 className="text-xl font-bold">{result.title}</h2>
              <p>{result.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No results found for "{searchQuery}"</p>
      )}
    </div>
  );
}

export default SearchPage;
