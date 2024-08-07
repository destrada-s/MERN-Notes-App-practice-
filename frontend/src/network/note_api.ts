import { Note } from "../models/note";
import { User } from "../models/user";


async function fetchData(input: RequestInfo, init?: RequestInit)
{
    const response = await fetch(input, init);
    if (response.ok)
    {
        return response;
    } else
    {
        const errorBody =    await response.json();
        const errorMessage = errorBody.eror;
        throw Error(errorMessage);
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", {method :  "GET"});
    return response.json();
}

export interface SignUpCredentials {
    username : string,
    email: string,
    password: string
}

export async function signUp(credentials:SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup", {
        method : "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}


export async function fetchNotes() : Promise<Note[]> {
    const response = await fetchData("/api/notes", { method: "GET"});
    return response.json();
}

export interface NoteInput {
    title: string,
    text?: string,
}

export async function createNote (note: NoteInput): Promise<Note> {

    const response = await fetchData("/api/notes",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        }
    )
    return response.json();
}

export async function updateNote(noteId: string, note: NoteInput ) {
    const response = await fetchData("/api/notes/"+noteId, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(note),
    });
    return response.json();
}

export async function deleteNote(noteId: string) {
    await fetchData("/api/notes/"+noteId, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
        }
    });
}

