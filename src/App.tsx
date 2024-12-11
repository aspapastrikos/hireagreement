import { useState, useEffect } from 'react';
import { AgreementForm } from './components/AgreementForm';
import { AgreementPreview } from './components/AgreementPreview';
import { HirerSearch } from './components/HirerSearch';
import { ToastProvider } from './components/ui/toast-context';
import { initDB } from './services/db';
import type { Agreement, AgreementFormData } from './types/agreement';

export default function App() {
  const [agreement, setAgreement] = useState<Agreement | null>(null);
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    initDB().then(() => setDbInitialized(true));
  }, []);

  const handleSubmit = (data: AgreementFormData) => {
    setAgreement(data);
  };

  if (!dbInitialized) {
    return <div className="p-8">Initializing...</div>;
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Hire Agreement Generator</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Search Previous Hirers</h2>
            <HirerSearch onSelect={(hirer) => {
              const formElement = document.querySelector('form');
              if (formElement) {
                Object.entries(hirer).forEach(([key, value]) => {
                  const input = formElement.querySelector(`[name="${key}"]`);
                  if (input instanceof HTMLInputElement) {
                    input.value = value as string;
                  }
                });
              }
            }} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6">Agreement Details</h2>
              <AgreementForm onSubmit={handleSubmit} />
            </div>

            {agreement && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6">Agreement Preview</h2>
                <AgreementPreview agreement={agreement} />
              </div>
            )}
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}