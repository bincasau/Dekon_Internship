import { useCallback, useEffect, useState } from "react";
import { notebookNotes, type NotebookNote } from "../data/notebook";

const STORAGE_KEY = "web3learn-notes";

function loadNotes() {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    return savedNotes ? (JSON.parse(savedNotes) as NotebookNote[]) : notebookNotes;
  } catch {
    return notebookNotes;
  }
}

export function useNotebookNotes() {
  const [notes, setNotes] = useState<NotebookNote[]>(loadNotes);
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)), [notes]);
  const addNote = useCallback((note: NotebookNote) => setNotes((current) => [note, ...current]), []);
  return { notes, addNote };
}
