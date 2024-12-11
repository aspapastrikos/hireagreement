import { useRef } from 'react';
import { format } from 'date-fns';
import type { Agreement } from '../types/agreement';
import { formatCurrency } from '../utils/format';
import { generateAgreementPDF, emailAgreement } from '../utils/pdf';
import { useToast } from '../hooks/useToast';

interface AgreementPreviewProps {
  agreement: Agreement;
}

export function AgreementPreview({ agreement }: AgreementPreviewProps) {
  const agreementRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleEmailAgreement = async () => {
    if (!agreementRef.current || !agreement.hirerEmail) return;
    
    try {
      const pdfBlob = await generateAgreementPDF(agreementRef.current);
      await emailAgreement(agreement.hirerEmail, pdfBlob);
      toast({
        title: "Agreement Ready",
        description: "The agreement has been downloaded and your email client will open shortly.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div ref={agreementRef} className="prose max-w-none">
        <h1>Hire Agreement</h1>
        
        <div className="mb-6">
          <h2>Company Details</h2>
          <p>
            {agreement.companyName}<br />
            {agreement.companyAddress}<br />
            Phone: {agreement.companyPhone}
          </p>
        </div>

        <div className="mb-6">
          <h2>Hirer Details</h2>
          <p>
            Name: {agreement.hirerName}<br />
            Age: {agreement.hirerAge}<br />
            Address: {agreement.hirerAddress}<br />
            Exmouth Address: {agreement.exmouthAddress}<br />
            Phone: {agreement.hirerPhone}<br />
            Email: {agreement.hirerEmail}<br />
            License Number: {agreement.hirerLicenseNumber}<br />
            Vehicle Registration: {agreement.vehicleRegistration}
          </p>
        </div>

        <div className="mb-6">
          <h2>Hire Items</h2>
          {agreement.items.map((item, index) => (
            <div key={index} className="mb-4">
              <h3>{item.name}</h3>
              <p>
                Type: {item.type}<br />
                Registration/Serial: {item.identifier}<br />
                Condition: {item.condition}<br />
                Daily Rate: {formatCurrency(item.dailyRate)}<br />
                Bond: {formatCurrency(item.bond)}
              </p>
              
              {item.inspectionPhotos.length > 0 && (
                <div>
                  <h4>Inspection Photos</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {item.inspectionPhotos.map((photo) => (
                      <div key={photo.id}>
                        <img src={photo.url} alt={photo.description} className="w-full" />
                        <p className="text-sm mt-1">{photo.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h2>Hire Period</h2>
          <p>
            Start Date: {format(new Date(agreement.startDate), 'PP')}<br />
            End Date: {format(new Date(agreement.endDate), 'PP')}<br />
            Total Amount: {formatCurrency(agreement.totalAmount)}<br />
            Bond Paid: {formatCurrency(agreement.bondPaid)}
          </p>
        </div>

        <div className="mb-6">
          <h2>Signatures</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold mb-2">Hirer Signature:</p>
              {agreement.hirerSignature ? (
                <img 
                  src={agreement.hirerSignature} 
                  alt="Hirer Signature" 
                  className="border rounded p-2 w-full"
                />
              ) : (
                <div className="border rounded p-4 text-gray-400 text-center">
                  No signature provided
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold mb-2">Company Representative Signature:</p>
              {agreement.companySignature ? (
                <img 
                  src={agreement.companySignature} 
                  alt="Company Signature" 
                  className="border rounded p-2 w-full"
                />
              ) : (
                <div className="border rounded p-4 text-gray-400 text-center">
                  No signature provided
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleEmailAgreement}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Email Agreement to Hirer
      </button>
    </div>
  );
}