import React, { useEffect, useState } from 'react';
//import logo from './logo.svg';
//import './App.css';
//import { Button } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import { Col, Container, Row, Button } from 'react-bootstrap';
import styles from "./styles/Notes_page.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/note_api"
import AddNoteDialog from './components/AddNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes () {
      try {
       const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      }
      catch (error) {
        console.error(error);
        alert(error);
      }
    }

    loadNotes();
  }, []);

  return (
    <Container>
      <Button className={`mt-4 ${stylesUtils.blockCenter} mb-4`} onClick={() =>  setShowAddNoteDialog(true)}>
        Add a new note
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
      {
      notes.map(note => (
        <Col key={note._id} >
        <Note note_comp={note} className={styles.note} />
        </Col>
      ))
      }
{
  showAddNoteDialog &&
  <AddNoteDialog OnDismiss={() => setShowAddNoteDialog(false)}
  onNoteSaved={(newNote) => {
    setNotes([...notes, newNote]);
    setShowAddNoteDialog(false);
  }}/>
}
      </Row>
    </Container>
  );
}

export default App;
