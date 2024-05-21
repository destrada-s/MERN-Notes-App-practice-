import { Form, Modal, Button } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/note_api";
import  * as NotesApi from "../network/note_api";

interface AddNoteDialogProps {
    OnDismiss: () => void,
    onNoteSaved: (note:Note) => void,
}

const AddNoteDialog = ({OnDismiss, onNoteSaved}: AddNoteDialogProps) => {
    
    const {register,handleSubmit,formState : {errors, isSubmitting}} = useForm<NoteInput>();

    async function onSubmit(input: NoteInput) {
        try
        {
            const noteResponse = await NotesApi.createNote(input);
            onNoteSaved(noteResponse);
        }
        catch (error)
        {
            console.error(error);
            alert(error);
        }
    }
    
    return (
        <Modal show onHide={OnDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Note
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title"
                        isInvalid={!!errors.title}
                        {...register("title", {required : "Required"})}
                            /> 
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" 
                                    rows={5}
                                    placeholder="Text"
                                    {...register("text")}
                        /> 
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type ="submit" 
                form="addNoteForm" 
                disabled={isSubmitting}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
      );
}
 
export default AddNoteDialog;