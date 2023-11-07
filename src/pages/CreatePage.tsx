import {useState, useRef, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { createNote } from '../store/slice'



const CreatePage = () => {

    const [text, setText] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const { notebookId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [notebook, setNotebook] = useState()

    const notebooks = useSelector(state => state.notebooks.notebooks)

    useEffect(() => {
      const nb = notebooks.filter(n => n.id == notebookId)[0]
      setNotebook(nb)
    }, [])

    useEffect(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, []); 

    const addNote = (e) => {

        e.preventDefault()


        if (notebook) {
            const note = {id: Math.random(), title: text}
            const updatedNotes = [...notebook.notes, note]
            const updatedNotebook = { ...notebook, notes: updatedNotes }
            dispatch(createNote(updatedNotebook))
            navigate(`/notes/${notebookId}`)
        }

        
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = e.target.value
        setText(content)
    }


    return (
        <div className="w-full max-w-screen-sm mx-auto p-4">
            <form className="bg-white p-6 rounded-lg shadow-md">

                <div className="mb-4">
                    <label htmlFor="text-area" className="block text-gray-700 font-bold mb-2">Text Area:</label>
                    <textarea ref={textareaRef} onChange={handleChange} id="text-area" name="text-area" className="w-full p-2 border rounded-lg h-40"></textarea>
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