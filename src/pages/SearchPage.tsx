import {useState, useEffect, useRef} from 'react'
import { Note } from '../types/types'
import useNotebooks from '../hooks/useNotebooks'

type FilterBy = 'title' | 'content'

const SearchPage = () => {

    const [notes, setNotes] = useState<Note[]>([])
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
    const [filterBy, setFilterBy] = useState<FilterBy>('title')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [])

    useEffect(() => {
        const allNotes = [];
      
        for (const item of notebooks) {
          for (const n of item.notes) {
            allNotes.push(n);
          }
        }

        setNotes(allNotes)
        setFilteredNotes(allNotes)
      
    }, [])


    const notebooks = useNotebooks()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase()

        if(!term.length) {
            setFilteredNotes(notes)
            return
        }

        const filtered = notes.filter(n => n[filterBy].toLowerCase().includes(term))
        setFilteredNotes(filtered)
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterBy(e.target.value as FilterBy)
    }

    return (
        <div className="max-w-screen-xl mx-auto p-4">

            <form className="w-full max-w-sm">
                <div className="mb-4">
                    <label htmlFor="filterBy" className="block text-gray-700">Filter By:</label>
                    <select
                        id="filterBy"
                        onChange={(e) => handleFilterChange(e)}
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-lg shadow-md focus:ring focus:ring-blue-300"
                    >
                        <option value="title">Title</option>
                        <option value="content">Content</option>
                    </select>
                </div>

                <div className="mb-4">
                    <input
                    type="text"
                    ref={inputRef}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border rounded-lg shadow-md focus:ring focus:ring-blue-300"
                    placeholder="Search..."
                    />
                </div>
            </form>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => {
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
                    </div>
                    );
                })
                ) : (
                    <p>There are no notes</p>
                    )
            }

          </div>
        </div>
    )
}

export default SearchPage