import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { InspectionPhotos } from './InspectionPhotos';
import type { AgreementFormData, InspectionPhoto } from '../types/agreement';

interface HireItemFormProps {
  index: number;
  register: UseFormRegister<AgreementFormData>;
  errors: FieldErrors<AgreementFormData>;
  onRemove: () => void;
  photos: InspectionPhoto[];
  onAddPhoto: (photo: InspectionPhoto) => void;
  onRemovePhoto: (photoId: string) => void;
}

export function HireItemForm({
  index,
  register,
  errors,
  onRemove,
  photos,
  onAddPhoto,
  onRemovePhoto
}: HireItemFormProps) {
  return (
    <div className="p-4 border rounded-lg mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Hire Item {index + 1}</h3>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 p-2 text-lg"
        >
          Remove
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor={`items.${index}.type`}>Type</Label>
          <select
            {...register(`items.${index}.type`)}
            className="w-full h-12 border rounded-md px-3 bg-white"
          >
            <option value="boat">Boat</option>
            <option value="vehicle">Vehicle</option>
            <option value="equipment">Equipment</option>
          </select>
        </div>

        <div>
          <Label htmlFor={`items.${index}.name`}>Item Name</Label>
          <Input
            {...register(`items.${index}.name`)}
            className={`h-12 ${errors.items?.[index]?.name ? 'border-red-500' : ''}`}
          />
          {errors.items?.[index]?.name && (
            <p className="text-red-500 text-sm mt-1">{errors.items[index].name?.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor={`items.${index}.identifier`}>Registration/Serial Number</Label>
          <Input
            {...register(`items.${index}.identifier`)}
            className={`h-12 ${errors.items?.[index]?.identifier ? 'border-red-500' : ''}`}
          />
          {errors.items?.[index]?.identifier && (
            <p className="text-red-500 text-sm mt-1">{errors.items[index].identifier?.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor={`items.${index}.condition`}>Condition</Label>
          <Input
            {...register(`items.${index}.condition`)}
            className={`h-12 ${errors.items?.[index]?.condition ? 'border-red-500' : ''}`}
          />
          {errors.items?.[index]?.condition && (
            <p className="text-red-500 text-sm mt-1">{errors.items[index].condition?.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor={`items.${index}.dailyRate`}>Daily Rate ($)</Label>
          <Input
            type="number"
            inputMode="decimal"
            step="0.01"
            {...register(`items.${index}.dailyRate`, { valueAsNumber: true })}
            className={`h-12 ${errors.items?.[index]?.dailyRate ? 'border-red-500' : ''}`}
          />
          {errors.items?.[index]?.dailyRate && (
            <p className="text-red-500 text-sm mt-1">{errors.items[index].dailyRate?.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor={`items.${index}.bond`}>Bond ($)</Label>
          <Input
            type="number"
            inputMode="decimal"
            step="0.01"
            {...register(`items.${index}.bond`, { valueAsNumber: true })}
            className={`h-12 ${errors.items?.[index]?.bond ? 'border-red-500' : ''}`}
          />
          {errors.items?.[index]?.bond && (
            <p className="text-red-500 text-sm mt-1">{errors.items[index].bond?.message}</p>
          )}
        </div>

        <InspectionPhotos
          photos={photos}
          onAddPhoto={onAddPhoto}
          onRemovePhoto={onRemovePhoto}
        />
      </div>
    </div>
  );
}