import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { addNote, getHirerNotes, deleteNote } from '../services/db';
import type { CompanyNote } from '../types/notes';
import { Input } from './ui/input';

interface CompanyNotesProps {
  hirerId: string;
}

export function CompanyNotes({ hirerId }: CompanyNotesProps) {
  const [notes, setNotes] = useState<CompanyNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);

  useEffect(() => {
    loadNotes();
  }, [hirerId]);

  async function loadNotes() {
    const hirerNotes = await getHirerNotes(hirerId);
    setNotes(hirerNotes);
  }

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    if (!newNote.trim()) return;

    await addNote(hirerId, newNote, isPrivate);
    setNewNote('');
    loadNotes();
  }

  async function handleDeleteNote(noteId: string) {
    await deleteNote(noteId);
    loadNotes();
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Company Notes</h3>
      
      <form onSubmit={handleAddNote} className="space-y-4">
        <div>
          <Input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Private note (staff only)</span>
          </label>
          
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Note
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`p-4 rounded-lg ${
              note.isPrivate ? 'bg-yellow-50' : 'bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-900">{note.content}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {format(new Date(note.createdAt), 'PPpp')} by {note.createdBy}
                  {note.isPrivate && ' (Private)'}
                </p>
              </div>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}