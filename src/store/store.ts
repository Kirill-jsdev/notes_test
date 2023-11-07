import { configureStore } from '@reduxjs/toolkit'
import notebooksReducer from './slice'
import { Notebook } from '../types/types'

export const store = configureStore({
    reducer: {
        notebooks: notebooksReducer
    }
})

export type RootState = {
    notebooks: {
        notebooks: Notebook[]
    }
}