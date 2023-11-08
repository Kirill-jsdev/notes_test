import {Link} from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white w-full max-w-md p-6 rounded-md shadow-lg text-center">
                <p className="text-2xl font-bold mb-4">The page does not exist</p>
                <Link to="/" className="text-blue-500 hover:underline">
                    Home
                </Link>
            </div>
        </div>
    )
}

export default ErrorPage