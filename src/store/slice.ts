import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    notebooks: [
        {
            id: 1,
            name: 'Default',
            notes: [ 
                {
                    id: '01',
                    title: "Do some stuff at 10 am"
                }, 
                {
                    id: '02',
                    title: "Do something again"
                }, 
          ]  
        }
    ]
}

export const notebooksSlice = createSlice({
    name: 'notebooks',
    initialState,
    reducers: {
        createNotebook: (state) => {
            state.notebooks.push({
                id: Math.random(), 
                name: 'New Notebook', 
                notes: []
            })
        },
        deleteNotebook: (state, action) => {
            const newNotebooks = state.notebooks.filter(n => n.id !== action.payload)
            return {
              notebooks: newNotebooks,
            }
        },
        deleteNote: (state, action) => {
            const index = state.notebooks.findIndex((element) => element.id == action.payload.id);
            state.notebooks[index] = action.payload
            return state
        },
        createNote: (state, action) => {
            const index = state.notebooks.findIndex((element) => element.id == action.payload.id);
            state.notebooks[index] = action.payload
            return state
        },

    }
})

export const {createNotebook, deleteNotebook, deleteNote, createNote} = notebooksSlice.actions

export default notebooksSlice.reducer