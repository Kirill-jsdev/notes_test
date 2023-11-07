import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header className="bg-blue-500 py-4">
          <nav className="max-w-screen-xl mx-auto flex items-center justify-between">
            <Link to='/' className="text-white text-lg font-semibold hover:underline pl-4">
              MyNotes
            </Link>
            <ul className="flex items-center text-white pr-4">
              <li>
                <Link to='/dashboard' className="text-lg font-semibold hover:underline ml-4">
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </header>
    )
}

export default Navbar