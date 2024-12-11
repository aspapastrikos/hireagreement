import { z } from 'zod';

const inspectionPhotoSchema = z.object({
  id: z.string(),
  url: z.string(),
  description: z.string(),
  timestamp: z.string(),
});

const hireItemSchema = z.object({
  type: z.enum(['boat', 'vehicle', 'equipment']),
  name: z.string().min(2, 'Item name is required'),
  identifier: z.string().min(1, 'Registration/Serial number is required'),
  condition: z.string().min(1, 'Condition description is required'),
  dailyRate: z.number().min(0, 'Daily rate must be 0 or greater'),
  bond: z.number().min(0, 'Bond must be 0 or greater'),
  inspectionPhotos: z.array(inspectionPhotoSchema).optional().default([]),
});

export const agreementSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  companyAddress: z.string().min(5, 'Company address is required'),
  companyPhone: z.string().min(8, 'Valid company phone is required'),
  
  hirerName: z.string().min(2, 'Hirer name is required'),
  hirerAge: z.string().min(1, 'Age is required'),
  hirerAddress: z.string().min(5, 'Residential address is required'),
  exmouthAddress: z.string().min(5, 'Exmouth address is required'),
  hirerPhone: z.string().min(8, 'Valid phone is required'),
  hirerEmail: z.string().email('Valid email is required'),
  hirerLicenseNumber: z.string().min(1, 'Driver\'s license is required'),
  vehicleRegistration: z.string().min(1, 'Vehicle registration is required'),
  
  skipperName: z.string().min(2, 'Skipper name is required'),
  skipperLicenseNumber: z.string().min(1, 'Skipper license number is required'),
  
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(8, 'Emergency contact phone is required'),
  
  items: z.array(hireItemSchema).min(1, 'At least one item must be selected'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  totalAmount: z.number().min(0, 'Total amount must be 0 or greater'),
  bondPaid: z.number().min(0, 'Bond must be 0 or greater'),
  
  insuranceRequired: z.boolean(),
  fuelPolicy: z.string().min(1, 'Fuel policy is required'),
  damagePolicy: z.string().min(1, 'Damage policy is required'),
  returnPolicy: z.string().min(1, 'Return policy is required'),
  
  agreementDate: z.string().min(1, 'Agreement date is required'),
  
  hirerSignature: z.string().optional(),
  companySignature: z.string().optional()
});