import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { agreementSchema } from '../utils/validation';
import type { AgreementFormData } from '../types/agreement';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { HireItemForm } from './HireItemForm';
import { TermsAndConditions } from './TermsAndConditions';
import { useToast } from '../hooks/useToast';

export function AgreementForm({ onSubmit }: { onSubmit: (data: AgreementFormData) => void }) {
  const { toast } = useToast();
  const methods = useForm<AgreementFormData>({
    resolver: zodResolver(agreementSchema),
    defaultValues: {
      companyName: 'Exmouth Boat and Kayak Hire Pty Ltd',
      companyAddress: '7 Patterson Way',
      companyPhone: '0438230269',
      items: [],
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      agreementDate: new Date().toISOString().split('T')[0],
      insuranceRequired: true,
      fuelPolicy: 'Return with same fuel level as received',
      damagePolicy: 'Hirer responsible for excess',
      returnPolicy: 'Must return by dusk each day',
      totalAmount: 0,
      bondPaid: 0,
      hirerName: '',
      hirerAge: '',
      hirerAddress: '',
      exmouthAddress: '',
      hirerPhone: '',
      hirerEmail: '',
      hirerLicenseNumber: '',
      vehicleRegistration: '',
      skipperName: '',
      skipperLicenseNumber: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      hirerSignature: '',
      companySignature: ''
    }
  });

  const { control, handleSubmit, formState: { errors }, watch, setValue } = methods;
  const items = watch('items');

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const handleAddItem = () => {
    append({
      type: 'boat',
      name: '',
      identifier: '',
      condition: '',
      dailyRate: 0,
      bond: 0,
      inspectionPhotos: []
    });
  };

  const onSubmitForm = (data: AgreementFormData) => {
    try {
      if (!data.hirerSignature) {
        toast({
          title: "Error",
          description: "Hirer signature is required",
          variant: "destructive",
        });
        return;
      }
      if (!data.companySignature) {
        toast({
          title: "Error",
          description: "Company representative signature is required",
          variant: "destructive",
        });
        return;
      }
      onSubmit(data);
      toast({
        title: "Success",
        description: "Agreement generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate agreement. Please check all required fields.",
        variant: "destructive",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        {/* Hirer Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Hirer Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hirerName">Name</Label>
              <Input
                id="hirerName"
                {...methods.register('hirerName')}
                className={errors.hirerName ? 'border-red-500' : ''}
              />
              {errors.hirerName && (
                <p className="text-red-500 text-sm mt-1">{errors.hirerName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="hirerAge">Age</Label>
              <Input
                id="hirerAge"
                {...methods.register('hirerAge')}
                className={errors.hirerAge ? 'border-red-500' : ''}
              />
              {errors.hirerAge && (
                <p className="text-red-500 text-sm mt-1">{errors.hirerAge.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="hirerAddress">Residential Address</Label>
              <Input
                id="hirerAddress"
                {...methods.register('hirerAddress')}
                className={errors.hirerAddress ? 'border-red-500' : ''}
              />
              {errors.hirerAddress && (
                <p className="text-red-500 text-sm mt-1">{errors.hirerAddress.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="exmouthAddress">Exmouth Address</Label>
              <Input
                id="exmouthAddress"
                {...methods.register('exmouthAddress')}
                className={errors.exmouthAddress ? 'border-red-500' : ''}
              />
              {errors.exmouthAddress && (
                <p className="text-red-500 text-sm mt-1">{errors.exmouthAddress.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="hirerPhone">Phone</Label>
              <Input
                id="hirerPhone"
                {...methods.register('hirerPhone')}
                className={errors.hirerPhone ? 'border-red-500' : ''}
              />
              {errors.hirerPhone && (
                <p className="text-red-500 text-sm mt-1">{errors.hirerPhone.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="hirerEmail">Email</Label>
              <Input
                id="hirerEmail"
                type="email"
                {...methods.register('hirerEmail')}
                className={errors.hirerEmail ? 'border-red-500' : ''}
              />
              {errors.hirerEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.hirerEmail.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="hirerLicenseNumber">Driver's License</Label>
              <Input
                id="hirerLicenseNumber"
                {...methods.register('hirerLicenseNumber')}
                className={errors.hirerLicenseNumber ? 'border-red-500' : ''}
              />
              {errors.hirerLicenseNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.hirerLicenseNumber.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="vehicleRegistration">Vehicle Registration</Label>
              <Input
                id="vehicleRegistration"
                {...methods.register('vehicleRegistration')}
                className={errors.vehicleRegistration ? 'border-red-500' : ''}
              />
              {errors.vehicleRegistration && (
                <p className="text-red-500 text-sm mt-1">{errors.vehicleRegistration.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Skipper Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Skipper Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="skipperName">Skipper Name</Label>
              <Input
                id="skipperName"
                {...methods.register('skipperName')}
                className={errors.skipperName ? 'border-red-500' : ''}
              />
              {errors.skipperName && (
                <p className="text-red-500 text-sm mt-1">{errors.skipperName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="skipperLicenseNumber">Skipper License Number</Label>
              <Input
                id="skipperLicenseNumber"
                {...methods.register('skipperLicenseNumber')}
                className={errors.skipperLicenseNumber ? 'border-red-500' : ''}
              />
              {errors.skipperLicenseNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.skipperLicenseNumber.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
              <Input
                id="emergencyContactName"
                {...methods.register('emergencyContactName')}
                className={errors.emergencyContactName ? 'border-red-500' : ''}
              />
              {errors.emergencyContactName && (
                <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
              <Input
                id="emergencyContactPhone"
                {...methods.register('emergencyContactPhone')}
                className={errors.emergencyContactPhone ? 'border-red-500' : ''}
              />
              {errors.emergencyContactPhone && (
                <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Hire Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Hire Items</h3>
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Item
            </button>
          </div>

          {fields.map((field, index) => (
            <HireItemForm
              key={field.id}
              index={index}
              register={methods.register}
              errors={errors}
              onRemove={() => remove(index)}
              photos={field.inspectionPhotos}
              onAddPhoto={(photo) => {
                const newPhotos = [...field.inspectionPhotos, photo];
                setValue(`items.${index}.inspectionPhotos`, newPhotos);
              }}
              onRemovePhoto={(photoId) => {
                const newPhotos = field.inspectionPhotos.filter(p => p.id !== photoId);
                setValue(`items.${index}.inspectionPhotos`, newPhotos);
              }}
            />
          ))}
        </div>

        {/* Terms and Conditions with Signatures */}
        <TermsAndConditions items={items} />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
        >
          Generate Agreement
        </button>
      </form>
    </FormProvider>
  );
}