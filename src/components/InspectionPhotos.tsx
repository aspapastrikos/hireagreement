import { useCallback } from 'react';
import type { InspectionPhoto } from '../types/agreement';

interface InspectionPhotosProps {
  photos: InspectionPhoto[];
  onAddPhoto: (photo: InspectionPhoto) => void;
  onRemovePhoto: (photoId: string) => void;
}

export function InspectionPhotos({ photos, onAddPhoto, onRemovePhoto }: InspectionPhotosProps) {
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newPhoto: InspectionPhoto = {
        id: Math.random().toString(36).substr(2, 9),
        url: e.target?.result as string,
        description: '',
        timestamp: new Date().toISOString(),
      };
      onAddPhoto(newPhoto);
    };
    reader.readAsDataURL(file);
  }, [onAddPhoto]);

  const handleDescriptionChange = (photoId: string, description: string) => {
    const photo = photos.find(p => p.id === photoId);
    if (photo) {
      onAddPhoto({ ...photo, description });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Inspection Photos</h4>
        <label className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 inline-block">
          Add Photo
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="border rounded-lg p-4">
            <img
              src={photo.url}
              alt="Inspection"
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <textarea
              value={photo.description}
              onChange={(e) => handleDescriptionChange(photo.id, e.target.value)}
              placeholder="Add description..."
              className="w-full p-3 border rounded-md text-base"
              rows={3}
            />
            <button
              onClick={() => onRemovePhoto(photo.id)}
              className="mt-2 text-red-500 hover:text-red-700 p-2 w-full text-center text-lg"
            >
              Remove Photo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}