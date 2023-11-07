import {useRef, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editNote } from '../store/slice'




const EditPage = () => {

    // const textareaRef = useRef()
    const [text, setText] = useState('')
    const [currentNote, setCurrentNote] = useState()

    const {notebookId, noteId} = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const notebooks = useSelector(state => state.notebooks.notebooks)

    const edit = () => {
        // e.preventDefault()

        
        if (currentNote) {
            const notebook = notebooks.find(n => n.id == notebookId)
            const noteIndex = notebook.notes.findIndex(note => note.id === noteId)
            const note = {...currentNote, title: text}
            const newNotes = [...notebook.notes]
            newNotes[noteIndex] = note
            const editedNotebook = {...notebook, notes: [...newNotes]}
            console.log(editedNotebook, 'AAA')
            dispatch(editNote(editedNotebook))
        }


        navigate(`/notes/${notebookId}`)
    }

    useEffect(() => {
        const notebook = notebooks.find(n => n.id == notebookId)
        const note = notebook.notes.find(note => note.id == noteId)
        setCurrentNote(note)
        setText(note.title)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = e.target.value
        console.log(content)
        setText(content)
    }


    return (
        <div className="w-full max-w-screen-sm mx-auto p-4">
            <form className="bg-white p-6 rounded-lg shadow-md">

                <div className="mb-4">
                    <label htmlFor="text-area" className="block text-gray-700 font-bold mb-2">Text Area:</label>
                    <textarea value={text} onChange={handleChange} id="text-area" name="text-area" className="w-full p-2 border rounded-lg h-40"></textarea>
                </div>

                <div className="text-center">
                    <div onClick={edit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                        Save
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditPage