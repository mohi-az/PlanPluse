"use client"
import { ChangeFavNote, GetUserNotes } from "@/app/actions/userActions"
import React, { createContext, useEffect, useState, useTransition } from "react"

type notesContextType = {
    notes: noteType[],
    ChangeFav: (noteId: string) => Promise<ActionResult<boolean>>
    isPending: boolean
}
const notesContextInitial: notesContextType = {
    notes: [],
    ChangeFav: async () => ({ status: "error", error: "" }),
    isPending: false
}
export const NotesContext = createContext(notesContextInitial);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<noteType[]>([])
    const [isPending, startTransition] = useTransition();

    const GetNotes = async () => {
        startTransition(async () => {
            const response = await GetUserNotes();

            if (response.status === "success")
                setNotes(response.data)
            return
        }
        )
    }
    const ChangeFav = async (noteId: string): Promise<ActionResult<boolean>> => {
        const response = await ChangeFavNote(noteId);
        
        if (response.status === "success") {
            GetNotes();
            return { status: "success", data: true }
        }
        else {
            return { status: "error", error: response.error }
        }
    }
    useEffect(() => {
        GetNotes();
    }, [])
    return (
        <NotesContext.Provider value={{ notes, isPending, ChangeFav }}>
            {children}
        </NotesContext.Provider>
    )
}