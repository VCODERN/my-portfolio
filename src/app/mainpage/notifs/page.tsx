"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaPlus, FaSave } from "react-icons/fa";

interface Note {
  id: number;
  text: string;
  noteDateTime: string;
  createdAt: string;
}

const NotifsDrawer = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [editStates, setEditStates] = useState<{ [key: number]: string }>({});
  const [dateStates, setDateStates] = useState<{ [key: number]: string }>({});
  const [modal, setModal] = useState<{ action: "save" | "delete"; noteId: number | null }>({ action: "save", noteId: null });

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  const addNote = () => {
    const newNote: Note = {
      id: Date.now(),
      text: "",
      noteDateTime: new Date().toISOString().slice(0, 16),
      createdAt: new Date().toLocaleString(),
    };
    setNotes([...notes, newNote]);
    setEditStates((prev) => ({ ...prev, [newNote.id]: newNote.text }));
    setDateStates((prev) => ({ ...prev, [newNote.id]: newNote.noteDateTime }));
  };

  const handleEdit = (id: number, newText: string) => {
    setEditStates((prev) => ({ ...prev, [id]: newText }));
  };

  const handleDateChange = (id: number, newDate: string) => {
    setDateStates((prev) => ({ ...prev, [id]: newDate }));
  };

  const confirmAction = (action: "save" | "delete", id: number) => {
    setModal({ action, noteId: id });
  };

  const executeAction = () => {
    if (modal.noteId !== null) {
      if (modal.action === "save") {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === modal.noteId
              ? { ...note, text: editStates[note.id] ?? note.text, noteDateTime: dateStates[note.id] ?? note.noteDateTime }
              : note
          )
        );
      } else if (modal.action === "delete") {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== modal.noteId));
      }
    }
    setModal({ action: "save", noteId: null });
  };

  return (
    <>
      <motion.div
        className="fixed top-4 right-4 w-96 bg-gray-900/70 backdrop-blur-xl shadow-2xl rounded-xl border border-gray-700 overflow-hidden"
        drag="y"
        dragConstraints={{ top: 0, bottom: 250 }}
        style={{ zIndex: 1000 }}
      >
        <motion.div
          className="flex items-center justify-between bg-gray-800 p-4 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-white font-semibold text-lg">Notes & Reminders</span>
          {isOpen ? <FaChevronDown className="text-white text-xl" /> : <FaChevronUp className="text-white text-xl" />}
        </motion.div>

        {isOpen && (
          <div className="p-4 space-y-3">
            <AnimatePresence>
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col bg-gray-700 p-4 rounded-lg shadow-md"
                  drag="x"
                  dragConstraints={{ left: 0, right: 100 }}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x > 100) {
                      confirmAction("delete", note.id);
                    }
                  }}
                >
                  <textarea
                    value={editStates[note.id] ?? note.text}
                    onChange={(e) => handleEdit(note.id, e.target.value)}
                    className="w-full h-32 bg-gray-800 text-white outline-none border border-gray-600 p-2 rounded-md resize-none"
                    placeholder="Write something..."
                  />

                  <input
                    type="datetime-local"
                    value={dateStates[note.id] ?? note.noteDateTime}
                    onChange={(e) => handleDateChange(note.id, e.target.value)}
                    className="bg-gray-800 text-white px-2 py-1 mt-2 rounded-md outline-none border border-gray-600 text-sm cursor-pointer w-full"
                  />

                  <p className="text-xs text-gray-400 mt-1">Created: {note.createdAt}</p>

                  <div className="flex justify-end gap-2 mt-2">
                    <motion.button
                      onClick={() => confirmAction("save", note.id)}
                      className="p-2 bg-transparent text-white rounded-md hover:bg-green-700 transition"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaSave />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <motion.button
              onClick={addNote}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg text-lg shadow-md hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus /> Add Note
            </motion.button>
          </div>
        )}
      </motion.div>

      {modal.noteId !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
          style={{ zIndex: 999 }}
        >
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white text-lg font-semibold mb-4">{modal.action === "save" ? "Save Changes?" : "Delete Note?"}</h3>
            <p className="text-gray-400 text-sm mb-4">{modal.action === "save" ? "Are you sure you want to save changes to this note?" : "This action cannot be undone."}</p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-white bg-gray-600 rounded-md"
                onClick={() => setModal({ action: "save", noteId: null })}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-md ${modal.action === "save" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                onClick={executeAction}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default NotifsDrawer;
