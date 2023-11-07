import { configureStore } from '@reduxjs/toolkit'
import notebooksReducer from './slice'

export const store = configureStore({
    reducer: {
        notebooks: notebooksReducer
    }
})