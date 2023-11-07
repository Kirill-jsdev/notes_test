import {Outlet} from 'react-router-dom'
import Navbar from '../components.tsx/Navbar'

const RootLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default RootLayout