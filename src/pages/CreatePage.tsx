import {useState, useRef, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { createNote } from '../store/slice'
import { RootState } from '../store/store'
import {Notebook} from '../types/types'

const CreatePage = () => {

    const inputRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const { notebookId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [notebook, setNotebook] = useState<Notebook | null>(null)
    const notebooks = useSelector((state: RootState) => state.notebooks.notebooks)

    useEffect(() => {
      const nb = notebooks.filter(n => n.id == notebookId)[0]
      setNotebook(nb)
    }, [])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []); 

    const addNote = (e: React.MouseEvent<HTMLElement>) => {

        e.preventDefault()
        if (!notebook || !inputRef.current?.value || !textareaRef.current?.value) return

        const note = {
            id: Math.random() + '', 
            title: inputRef.current.value, 
            content: textareaRef.current.value
        }

        const updatedNotes = [...notebook.notes, note]
        const updatedNotebook = { ...notebook, notes: updatedNotes }
        dispatch(createNote(updatedNotebook))
        navigate(`/notes/${notebookId}`)
    }

    return (
        <div className="w-full max-w-screen-sm mx-auto p-4">
            <form className="bg-white p-6 rounded-lg shadow-md">

                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                    <input ref={inputRef}  id="title" name="title" className="w-full p-2 border rounded-lg" />
                </div>

                <div className="mb-4">
                    <label htmlFor="text-area" className="block text-gray-700 font-bold mb-2">Text Area:</label>
                    <textarea ref={textareaRef} id="text-area" name="text-area" className="w-full p-2 border rounded-lg h-40"></textarea>
                </div>

                <div className="text-center">
                    <button onClick={addNote} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreatePage