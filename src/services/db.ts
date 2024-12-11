import { openDB, DBSchema, IDBPDatabase } from 'idb';
import type { CompanyNote } from '../types/notes';
import type { Agreement } from '../types/agreement';

interface HirerDB extends DBSchema {
  hirers: {
    key: string;
    value: {
      id: string;
      name: string;
      age: string;
      address: string;
      exmouthAddress: string;
      phone: string;
      email: string;
      mobile: string;
      licenseNumber: string;
      vehicleRegistration: string;
      emergencyContactName: string;
      emergencyContactPhone: string;
      lastHireDate: string;
      createdAt: string;
      updatedAt: string;
    };
    indexes: { 'by-email': string; 'by-license': string; 'by-name': string };
  };
  agreements: {
    key: string;
    value: {
      id: string;
      hirerId: string;
      agreement: Agreement;
      createdAt: string;
    };
    indexes: { 'by-hirer': string };
  };
  notes: {
    key: string;
    value: CompanyNote;
    indexes: { 'by-hirer': string };
  };
}

let db: IDBPDatabase<HirerDB>;

export async function initDB() {
  db = await openDB<HirerDB>('hire-agreements-db', 2, {
    upgrade(db, oldVersion) {
      if (oldVersion < 1) {
        const hirerStore = db.createObjectStore('hirers', {
          keyPath: 'id',
        });
        hirerStore.createIndex('by-email', 'email');
        hirerStore.createIndex('by-license', 'licenseNumber');
        hirerStore.createIndex('by-name', 'name');

        const agreementStore = db.createObjectStore('agreements', {
          keyPath: 'id',
        });
        agreementStore.createIndex('by-hirer', 'hirerId');
      }
      
      if (oldVersion < 2) {
        const notesStore = db.createObjectStore('notes', {
          keyPath: 'id',
        });
        notesStore.createIndex('by-hirer', 'hirerId');
      }
    },
  });
}

// Hirer Functions
export async function addHirer(hirerData: Omit<HirerDB['hirers']['value'], 'id' | 'createdAt' | 'updatedAt'>) {
  const hirer = {
    ...hirerData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await db.put('hirers', hirer);
  return hirer;
}

export async function getHirerByEmail(email: string) {
  return await db.getFromIndex('hirers', 'by-email', email);
}

export async function getHirerByLicense(license: string) {
  return await db.getFromIndex('hirers', 'by-license', license);
}

export async function searchHirers(query: string) {
  const tx = db.transaction('hirers', 'readonly');
  const store = tx.objectStore('hirers');
  const hirers = await store.getAll();
  
  const searchTerm = query.toLowerCase();
  return hirers.filter(hirer => 
    hirer.name.toLowerCase().includes(searchTerm) ||
    hirer.email.toLowerCase().includes(searchTerm) ||
    hirer.licenseNumber.toLowerCase().includes(searchTerm)
  );
}

export async function updateHirer(id: string, hirerData: Partial<HirerDB['hirers']['value']>) {
  const hirer = await db.get('hirers', id);
  if (!hirer) throw new Error('Hirer not found');

  const updatedHirer = {
    ...hirer,
    ...hirerData,
    updatedAt: new Date().toISOString(),
  };
  await db.put('hirers', updatedHirer);
  return updatedHirer;
}

// Agreement Functions
export async function addAgreement(hirerId: string, agreement: Agreement) {
  const agreementRecord = {
    id: crypto.randomUUID(),
    hirerId,
    agreement,
    createdAt: new Date().toISOString(),
  };
  await db.put('agreements', agreementRecord);
  
  // Update hirer's last hire date
  await updateHirer(hirerId, { lastHireDate: new Date().toISOString() });
  
  return agreementRecord;
}

export async function getHirerAgreements(hirerId: string) {
  return await db.getAllFromIndex('agreements', 'by-hirer', hirerId);
}

// Note Functions
export async function addNote(hirerId: string, content: string, isPrivate: boolean = true) {
  const note: CompanyNote = {
    id: crypto.randomUUID(),
    hirerId,
    content,
    createdAt: new Date().toISOString(),
    createdBy: 'Company Staff',
    isPrivate,
  };

  await db.put('notes', note);
  return note;
}

export async function getHirerNotes(hirerId: string) {
  return await db.getAllFromIndex('notes', 'by-hirer', hirerId);
}

export async function deleteNote(noteId: string) {
  await db.delete('notes', noteId);
}