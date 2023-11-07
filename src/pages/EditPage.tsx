import {useRef, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editNote } from '../store/slice'
import { Note } from '../types/types'
import { RootState } from '../store/store'

const EditPage = () => {

    const inputRef = useRef<HTMLInputElement>(null)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [currentNote, setCurrentNote] = useState<Note | null>(null)

    const {notebookId, noteId} = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const notebooks = useSelector((state: RootState) => state.notebooks.notebooks)

    const edit = () => {
        if (currentNote && notebookId) {
            const notebook = notebooks.find(n => n.id == notebookId)

            if (!notebook || !title || !content) return

            const noteIndex = notebook.notes.findIndex(note => note.id == noteId)
            const note = {...currentNote, title, content}
            const newNotes = [...notebook.notes]
            newNotes[noteIndex] = note
            const editedNotebook = {...notebook, notes: [...newNotes]}
            dispatch(editNote(editedNotebook))
        }

        navigate(`/notes/${notebookId}`)
    }

    useEffect(() => {
        const notebook = notebooks.find(n => n.id == notebookId)

        if (!notebook) return

        const note = notebook.notes.find(note => note.id == noteId) as Note
        setCurrentNote(note)
        setTitle(note.title)
        setContent(note.content)
    }, [])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []); 

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = e.target.value
        setContent(content)
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const content = e.target.value
        setTitle(content)
    }

    return (
        <div className="w-full max-w-screen-sm mx-auto p-4">
            <form className="bg-white p-6 rounded-lg shadow-md">

                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                    <input value={title} onChange={handleTitleChange} ref={inputRef} id="title" name="title" className="w-full p-2 border rounded-lg" />
                </div>

                <div className="mb-4">
                    <label htmlFor="text-area" className="block text-gray-700 font-bold mb-2">Text Area:</label>
                    <textarea value={content} onChange={handleTextareaChange} id="text-area" name="text-area" className="w-full p-2 border rounded-lg h-40"></textarea>
                </div>

                <div className="text-center">
                    <div onClick={edit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
                        Save
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditPage