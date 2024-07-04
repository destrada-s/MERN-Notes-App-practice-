import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel} from "../models/note";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";
interface NoteProps {
    note_comp: NoteModel,
    onNoteClicked: (note : NoteModel) => void,
    onDeleteNoteClick: (note : NoteModel) => void,
    className?: string,
}

const Note = (({ note_comp, onNoteClicked, onDeleteNoteClick , className }: NoteProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt,
    } = note_comp;
    
    let created_updated_text: string;
    if (updatedAt > createdAt)
        created_updated_text = "Updated: " + formatDate(updatedAt);
    else
        created_updated_text = "Created: " + formatDate(createdAt);

    return (
        <Card className={`${styles.note_card} ${className}`}
        onClick={() => onNoteClicked(note_comp)}>
            <Card.Body className={styles.card_body}>
                <Card.Title
                className={styleUtils.flexCenter}>
                    {title} 
                    <MdDelete 
                    className="text-muted ms-auto"
                    onClick={(e) => {
                        onDeleteNoteClick(note_comp);
                        e.stopPropagation();
                    }}
                    />
                </Card.Title>
                <Card.Text className={styles.note_text}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {created_updated_text}
            </Card.Footer>
        </Card>
    );
});

export default Note; 