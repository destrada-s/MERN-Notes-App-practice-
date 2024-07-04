import React, { useEffect, useState } from 'react';
//import logo from './logo.svg';
//import './App.css';
//import { Button } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import { Col, Container, Row, Button, Spinner } from 'react-bootstrap';
import styles from "./styles/Notes_page.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/note_api"
import AddEditNoteDialog from './components/AddEditNoteDialog';
import {FaPlus} from "react-icons/fa"

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null);

  useEffect(() => {
    async function loadNotes () {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
       const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      }
      catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }

    loadNotes();
  }, []);

async function deleteNote(note: NoteModel) {
  try {
    await NotesApi.deleteNote(note._id);
    setNotes(notes.filter(existingNote => existingNote._id !== note._id));
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

const noteGrid =  <Row xs={1} md={2} xl={3} className={` g-4  ${styles.noteGrid} `}>
{
notes.map(note => (
  <Col key={note._id} >
  <Note note_comp={note}
  onDeleteNoteClick={deleteNote}
  //(note) => setNoteToEdit(note) or only setNoteToEdit like in delete
  onNoteClicked={(note) => setNoteToEdit(note)}
  className={styles.note} />
  </Col>
))
}
</Row>;

  return (
    <Container
    className={styles.notesPage}>
      <Button className={`mt-4 ${stylesUtils.blockCenter} mb-4 ${stylesUtils.flexCenter}`} 
      onClick={() =>  setShowAddEditNoteDialog(true)}>
        <FaPlus />
        Add a new note
      </Button>
    {notesLoading && <Spinner animation='border' variant='primary' /> }
    {showNotesLoadingError && <p>Something went wrong. Please refresh the page</p>}
    {!notesLoading && !showNotesLoadingError && 
    <>
    {
    notes.length > 0
    ? noteGrid 
    :
    <p> You dont have any notes yet</p>
    }
    </>
    }
{
  showAddEditNoteDialog &&
  <AddEditNoteDialog OnDismiss={() => setShowAddEditNoteDialog(false)}
  onNoteSaved={(newNote) => {
    setNotes([...notes, newNote]);
    setShowAddEditNoteDialog(false);
  }}/>
}
{
  noteToEdit &&
  <AddEditNoteDialog 
  noteToEdit = {noteToEdit}
  OnDismiss={() => setNoteToEdit(null)}
  onNoteSaved={(updateNote) => {
    setNotes(notes.map(existingNote =>  existingNote._id === updateNote._id ? updateNote : existingNote));
    setNoteToEdit(null);
  }}/>
}
    </Container>
  );
}

export default App;
