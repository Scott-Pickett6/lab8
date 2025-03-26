import { useEffect, useState } from "react";

function Home() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const url = 'https://api.openweathermap.org/data/2.5/weather?q=Halifax&units=metric&appid=284f88f528d1bd070135c4a0ed70daca';

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch weather data");
                }
                const data = await response.json();
                setWeather({
                    city: data.name,
                    temperature: data.main.temp,
                    humidity: data.main.humidity,
                });
            } catch (err) {
                setError(err.message);
            }
        };

        fetchWeather();
    }, []);

    return (
        <main className="container d-flex flex-column align-items-center">
            <h2>Home</h2>
            <p>
                Welcome to my portfolio. My name is Scott and I am a fourth year computer science student at Dalhousie University.
                I am from Dartmouth, Nova Scotia and went to Prince Andrew High School before attending Dalhousie. 
                I began programming in high school which led me to pursue a degree in computer science.
                Outside of programming and school I enjoy playing Hockey, Golf, Guitar, Video Games, and spending time with friends and family.
            </p>
            <section className="mt-4">
                <h4>Weather Information</h4>
                {error && <p className="text-danger">Error: {error}</p>}
                {weather ? (
                    <div>
                        <p><strong>City:</strong> {weather.city}</p>
                        <p><strong>Temperature:</strong> {weather.temperature}°C</p>
                        <p><strong>Humidity:</strong> {weather.humidity}%</p>
                    </div>
                ) : (
                    <p>Loading weather data...</p>
                )}
            </section>
        </main>
    );
}

export default Home;