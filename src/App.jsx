import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import WeatherDashboard from '@/components/WeatherDashboard';
import CityDetails from '@/pages/CityDetails';

function App() {
    return (
        <BrowserRouter basename="/WeatherNow">
            <Layout>
                <Routes>
                    <Route path="/" element={<WeatherDashboard />} />
                    <Route path="/city/:cityName" element={<CityDetails />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
