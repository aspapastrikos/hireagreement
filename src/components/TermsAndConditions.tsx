import { format } from 'date-fns';
import { standardTerms } from '../utils/termsAndConditions';
import type { HireItem } from '../types/agreement';
import { useFormContext } from 'react-hook-form';
import { SignatureField } from './SignatureField';

interface TermsAndConditionsProps {
  items: HireItem[];
}

export function TermsAndConditions({ items }: TermsAndConditionsProps) {
  const { watch, setValue } = useFormContext();
  const hirerName = watch('hirerName');
  const hirerAddress = watch('hirerAddress');
  
  const hasBoats = items.some(item => item.type === 'boat');
  const hasVehicles = items.some(item => item.type === 'vehicle');
  const hasEquipment = items.some(item => item.type === 'equipment');
  
  const today = new Date();
  const day = today.getDate();
  const month = format(today, 'MMMM');
  const year = today.getFullYear();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Agreement Terms</h2>

      <div className="prose max-w-none">
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <p className="text-lg">
            THIS AGREEMENT is made and entered into this {day} day of {month}, {year} by and
            between Exmouth Boat & Kayak Hire Pty Ltd, of 7 Patterson Way, Exmouth, WA hereinafter called
            "The Firm", and {hirerName || '___________________________'}, of {hirerAddress || '___________________________________'},
            hereinafter called "Hirer".
          </p>
        </div>
        
        <div className="space-y-6">
          {hasBoats && (
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Boat Hire Terms</h3>
              {standardTerms.boatHire.map((section, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">{section.title}</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {section.conditions.map((condition, condIndex) => (
                      <li key={condIndex} className="text-gray-700">{condition}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {hasVehicles && (
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Vehicle Hire Terms</h3>
              {standardTerms.vehicleHire.map((section, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">{section.title}</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {section.conditions.map((condition, condIndex) => (
                      <li key={condIndex} className="text-gray-700">{condition}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {hasEquipment && (
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Equipment Hire Terms</h3>
              {standardTerms.equipmentHire.map((section, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">{section.title}</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {section.conditions.map((condition, condIndex) => (
                      <li key={condIndex} className="text-gray-700">{condition}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 bg-yellow-50 p-6 rounded-lg border border-yellow-100">
          <p className="text-sm text-gray-700 mb-4">
            By signing below, I acknowledge that I have read, understood, and agree to all the terms and conditions outlined above.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SignatureField
              label="Hirer Signature"
              onSign={(signature) => setValue('hirerSignature', signature)}
            />
            <SignatureField
              label="Company Representative Signature"
              onSign={(signature) => setValue('companySignature', signature)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}