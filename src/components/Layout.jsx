import { Link } from 'react-router-dom';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-200 flex justify-center p-4 sm:p-6 lg:p-8 border border-gray-100">
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-md w-full max-w-lg">
                <Link to={`/`}>
                    <h1 className="text-2xl font-semibold mb-4 text-left sm:text-center">WeatherNow</h1>
                </Link>
                {children}
            </div>
        </div>
    );
}
