export type HireItemType = 'boat' | 'vehicle' | 'equipment';

export interface InspectionPhoto {
  id: string;
  url: string;
  description: string;
  timestamp: string;
}

export interface HireItem {
  type: HireItemType;
  name: string;
  identifier: string;
  condition: string;
  dailyRate: number;
  bond: number;
  inspectionPhotos: InspectionPhoto[];
}

export interface Agreement {
  // Hire Company Details
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  
  // Hirer Details
  hirerName: string;
  hirerAge: string;
  hirerAddress: string;
  exmouthAddress: string;
  hirerPhone: string;
  hirerEmail: string;
  hirerLicenseNumber: string;
  vehicleRegistration: string;
  
  // Skipper Details
  skipperName: string;
  skipperLicenseNumber: string;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  
  // Hire Details
  items: HireItem[];
  startDate: string;
  endDate: string;
  totalAmount: number;
  bondPaid: number;
  
  // Terms
  insuranceRequired: boolean;
  fuelPolicy: string;
  damagePolicy: string;
  returnPolicy: string;

  // Signatures
  hirerSignature?: string;
  companySignature?: string;
}

export interface AgreementFormData extends Agreement {
  agreementDate: string;
}