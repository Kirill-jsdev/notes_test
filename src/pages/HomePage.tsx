import {useSelector, useDispatch} from 'react-redux'
import {createNotebook, deleteNotebook} from '../store/slice'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()

    const notebooks = useSelector(state => state.notebooks.notebooks)

    const dispatch = useDispatch()

    const removeNotebook = (e, notebookId) => {
        e.stopPropagation()
        e.preventDefault()
        dispatch(deleteNotebook(notebookId))
    }

    console.log(notebooks)

    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <div onClick={() => dispatch(createNotebook())} className="border border-dashed border-4 p-4 hover:bg-gray-100 rounded-lg flex justify-center cursor-pointer">
                    <div className="flex items-center space-x-2 cursor-pointer">
                        Add a notebook
                    </div>
                </div>


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