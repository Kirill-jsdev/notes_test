import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

const SearchPage = () => {

    const [notes, setNotes] = useState([])
    const [filteredNotes, setFilteredNotes] = useState([])

    const notebooks = useSelector(state => state.notebooks.notebooks)

    const handleChange = (e) => {
        const term = e.target.value

        if(!term.length === 0) {
            setFilteredNotes(notes)
            return
        }

        const filtered = notes.filter(n => n.title.toLowerCase().includes(term))

        setFilteredNotes(filtered)

    }

    useEffect(() => {
        const allNotes = [];
      
        for (const item of notebooks) {
          for (const n of item.notes) {
            allNotes.push(n);
          }
        }
        setNotes(allNotes)
        setFilteredNotes(allNotes)
      
      }, []);

    return (
        <div className="max-w-screen-xl mx-auto p-4">

            <input type="text" onChange={handleChange}  placeholder="Search..." />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">


            {filteredNotes.length && filteredNotes.map(note => {
              return (
                <div key={note.id} className="border p-4 hover:bg-gray-100 rounded-lg flex justify-between">
                  <p className="flex-grow text-lg font-semibold mb-2">{note.title}</p>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-500">
                      Edit
                    </button>
                    <button className="text-red-500">
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
    )
}

export default SearchPage