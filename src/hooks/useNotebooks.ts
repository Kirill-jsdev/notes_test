import {useSelector} from 'react-redux'
import { RootState } from '../store/store'


const useNotebooks = () => {

    const notebooks = useSelector((state: RootState) => state.notebooks.notebooks)

    return notebooks

}

export default useNotebooks