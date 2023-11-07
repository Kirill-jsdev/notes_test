import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {deleteNote} from '../store/slice'
import { useNavigate, useParams } from 'react-router-dom'

const NotesPage = () => {

    const {notebookId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [notebook, setNotebook] = useState()
    const notebooks = useSelector(state => state.notebooks.notebooks)

    useEffect(() => {
      const nb = notebooks.filter(n => n.id == notebookId)[0]
      setNotebook(nb)
    }, [])

    const removeNote = (noteId: string) => {
      if (notebook) {
        const updatedNotes = notebook.notes.filter(n => n.id != noteId)
        const updatedNotebook = { ...notebook, notes: updatedNotes }
        dispatch(deleteNote(updatedNotebook))
        setNotebook(updatedNotebook)
      }
    }

    return (
        <div className="max-w-screen-xl mx-auto p-4">

          <h1 className="mb-10">{notebook ? notebook.name : 'Title'}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notebook?.notes.length &&
              notebook.notes.map((note) => {
                const truncatedTitle = note.title.length > 20 ? note.title.substring(0, 20) + '...' : note.title;

                return (
                  <div key={note.id} className="border p-4 hover:bg-gray-100 rounded-lg flex flex-col">
                    <div className="mb-2">
                      <p className="text-lg font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                        {truncatedTitle}
                      </p>
                    </div>
                    <div className="flex-grow overflow-hidden text-sm">
                      {note.content}
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => navigate(`/edit/${notebookId}/${note.id}`)}
                        className="text-blue-500"
                      >
                        Edit
                      </button>
                      <button onClick={() => removeNote(note.id)} className="text-red-500">
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="text-center mt-10">
              <button onClick={() => navigate(`/create/${notebookId}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                  Add
              </button>
          </div>
        </div>
    )
}

export default NotesPage