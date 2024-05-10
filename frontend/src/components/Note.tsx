import styles from "../styles/Note.module.css"
import { Card } from "react-bootstrap";
import { Note as NoteModel} from "../models/note";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
    note_comp: NoteModel,
    className?: string,
}

const Note = (({ note_comp, className }: NoteProps) => {
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
        created_updated_text = "Updated: " + formatDate(createdAt);

    return (
        <Card className={`${styles.note_card} ${className}`}>
            <Card.Body className={styles.card_body}>
                <Card.Title>
                    {title}
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