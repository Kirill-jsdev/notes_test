const SearchPage = () => {

    return (
        <div className="max-w-screen-xl mx-auto p-4">

          <h1>Search results</h1>



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* {notebook.notes.length && notebook.notes.map(note => { */}
              {/* return ( */}
                <div className="border p-4 hover:bg-gray-100 rounded-lg flex justify-between">
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
              {/* ) */}
            {/* })} */}

            
            

            

          </div>

          
        </div>

    )


}

export default SearchPage