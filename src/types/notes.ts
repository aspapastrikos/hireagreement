export interface CompanyNote {
  id: string;
  hirerId: string;
  content: string;
  createdAt: string;
  createdBy: string;
  isPrivate: boolean;
}

export interface NoteFormData {
  content: string;
  isPrivate: boolean;
}