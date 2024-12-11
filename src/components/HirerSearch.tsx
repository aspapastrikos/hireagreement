import { useState } from 'react';
import { useHirerSearch } from '../hooks/useHirerSearch';
import { Input } from './ui/input';
import { CompanyNotes } from './CompanyNotes';

interface HirerSearchProps {
  onSelect: (hirer: any) => void;
}

export function HirerSearch({ onSelect }: HirerSearchProps) {
  const { searchTerm, setSearchTerm, results, loading, error } = useHirerSearch();
  const [selectedHirer, setSelectedHirer] = useState<any>(null);

  const handleHirerSelect = (hirer: any) => {
    setSelectedHirer(hirer);
    onSelect(hirer);
  };

  return (
    <div className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="Search by name, email, or license number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {loading && <p className="text-gray-500">Searching...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {results.length > 0 && (
        <div className="border rounded-lg divide-y">
          {results.map((hirer) => (
            <button
              key={hirer.id}
              onClick={() => handleHirerSelect(hirer)}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <p className="font-medium">{hirer.name}</p>
              <p className="text-sm text-gray-600">{hirer.email}</p>
              <p className="text-sm text-gray-600">License: {hirer.licenseNumber}</p>
            </button>
          ))}
        </div>
      )}

      {selectedHirer && (
        <div className="mt-8">
          <CompanyNotes hirerId={selectedHirer.id} />
        </div>
      )}
    </div>
  );
}