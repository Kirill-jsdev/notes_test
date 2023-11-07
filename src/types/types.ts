export type Note = {
    id: string
    title: string
    content: string
}

export type Notebook = {
    id: string
    name: string
    notes: Note[]
}