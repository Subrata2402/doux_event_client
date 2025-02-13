import React, { useEffect, useState } from 'react'
import Header from '../header/Header';
import './Favourites.scss';
import NoteCard from '../note_card/NoteCard';
import { useNotes } from '../../store/NotesContext';

function Favourites() {
  const { notes } = useNotes();
  const [searchText, setSearchText] = useState('');
  const [sortedNotes, setSortedNotes] = useState([]);
  const [sortedType, setSortedType] = useState('Date');

  useEffect(() => {
    let filteredNotes = notes;
    if (searchText.trim()) {
      filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchText.toLowerCase()) ||
        note.description.toLowerCase().includes(searchText.toLowerCase()));
    }
    filteredNotes = filteredNotes.filter(note => note.isFavourite);
    if (sortedType.toLowerCase() === 'date') {
      filteredNotes = [...filteredNotes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortedType.toLowerCase() === 'size') {
      filteredNotes = [...filteredNotes].sort((a, b) => b.description.length - a.description.length);
    }
    setSortedNotes(filteredNotes);
  }, [searchText, sortedType, notes]);

  return (
    <div className="favourite-wrapper">
      <Header setSearchText={setSearchText} searchText={searchText} setSortedType={setSortedType} />
      {
        sortedNotes.length === 0
          ? <div className="no-notes">There are no notes found in your favourite list...</div>
          :
          <div className="cards-container">
            <div className="note-cards">
              {
                sortedNotes.map(note => <NoteCard key={note.id} note={note} />)
              }
            </div>
          </div>
      }
    </div>
  )
}

export default Favourites;