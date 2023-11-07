import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    notebooks: [
        {
            id: 1,
            name: 'Default',
            notes: [ 
                {
                    id: '01',
                    title: "Do some stuff at 10 am",
                    content: 'Onsectetur adipiscing elit, sed do eiusmod '
                }, 
                {
                    id: '02',
                    title: "Do something again",
                    content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
                }, 
          ]  
        }
    ]
}

export const notebooksSlice = createSlice({
    name: 'notebooks',
    initialState,
    reducers: {
        createNotebook: (state, action) => {
            state.notebooks.push({
                id: Math.random(), 
                name: action.payload, 
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
            const index = state.notebooks.findIndex((element) => element.id == action.payload.id)
            state.notebooks[index] = action.payload
            return state
        },
        createNote: (state, action) => {
            const index = state.notebooks.findIndex((element) => element.id == action.payload.id)
            state.notebooks[index] = action.payload
            return state
        },
        editNote: (state, action) => {
            const index = state.notebooks.findIndex((element) => element.id == action.payload.id)
            state.notebooks[index] = action.payload
            return state
        }

    }
})

export const {createNotebook, deleteNotebook, deleteNote, createNote, editNote} = notebooksSlice.actions

export default notebooksSlice.reducer