import {useRef, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {createNotebook, deleteNotebook} from '../store/slice'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store/store'

const HomePage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const notebooks = useSelector((state: RootState) => state.notebooks.notebooks)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
      }, []); 

    const removeNotebook = (e: React.MouseEvent<HTMLElement>, notebookId: string) => {
        e.stopPropagation()
        e.preventDefault()
        dispatch(deleteNotebook(notebookId))
    }

    const addNotebook = (e: React.FormEvent) => {
        e.stopPropagation()
        e.preventDefault()
        if (inputRef.current) {
            if (!inputRef.current.value) return 

            dispatch(createNotebook(inputRef.current.value))
            inputRef.current.value = ''
        }
    }

    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <form onSubmit={addNotebook}>
                    <div className="border border-dashed border-4 p-4 bg-gray-100 rounded-lg flex justify-center cursor-pointer">
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <label htmlFor="notebookName">Name:</label>
                            <input  id="notebookName" className="px-1" ref={inputRef} type="text" name="notebookName" />
                            <button type="submit" className="bg-blue-300 p-1 rounded-lg">
                                New notebook
                            </button>
                        </div>
                    </div>
                </form>


                {notebooks.map(n => {
                    return (
                        <div key={n.id} onClick={() => navigate(`/notes/${n.id}`)} className="border p-4 hover:bg-gray-100 rounded-lg flex justify-between cursor-pointer">
                            <p className="flex-grow text-lg font-semibold mb-2">{n.name}</p>

                            <button onClick={(e) => removeNotebook(e, n.id)} className="text-red-500 cursor-pointer">
                                Delete
                            </button>
                        </div>
                    )
                })}   
            </div>
        </div>
    )
}

export default HomePage