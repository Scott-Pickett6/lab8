import { useEffect, useState } from "react";

function Home() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); 
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem("contactFormDraft");
        return savedData ? JSON.parse(savedData) : {
            name: "",
            email: "",
            message: "",
            subject: "",
            consent: false,
        };
    });
    const [formErrors, setFormErrors] = useState({});
    const [formSuccess, setFormSuccess] = useState(false);

    const regex = {
        name: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        subject: /^[A-Za-z\s]+$/,
        message: /^[^<>]+$/
    };

    function sanitizeInput(input) {
        return input.replace(/[<>]/g, "");
    }

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        const sanitizedValue = type === "checkbox" ? checked : sanitizeInput(value);

        const updatedFormData = { ...formData, [name]: sanitizedValue };
        setFormData(updatedFormData);
        localStorage.setItem("contactFormDraft", JSON.stringify(updatedFormData));
    }

    function validateForm() {
        let errors = {};

        if (!regex.name.test(formData.name)) {
            errors.name = "Invalid name format.";
        }
        if (!regex.email.test(formData.email)) {
            errors.email = "Invalid email address.";
        } 
        if (!regex.subject.test(formData.subject)) { 
            errors.subject = "Subject can only contain letters.";
        }
        if (!regex.message.test(formData.message)) { 
            errors.message = "Message cannot contain special characters < or >.";
        }
        if (!formData.consent) { 
            errors.consent = "You must agree to be contacted.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    useEffect(() => {
        if (isFormSubmitted) {
            fetch("/.netlify/functions/api/submitMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === "Message successfully saved!") {
                        setFormSuccess(true);
                        setFormErrors({});
                        setFormData({
                            name: "",
                            email: "",
                            message: "",
                            subject: "",
                            consent: false,
                        });
                        localStorage.removeItem("contactFormDraft");

                        setTimeout(() => setFormSuccess(false), 3000);
                    } else {
                        alert("Failed to send message.");
                    }
                })
                .catch((error) => {
                    alert("Error sending message. Please try again later.");
                    console.error(error);
                })
                .finally(() => {
                    setIsFormSubmitted(false); 
                });
        }
    }, [isFormSubmitted, formData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsFormSubmitted(true); 
        }
    };

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
            <section className="d-flex flex-row gap-5">
                <section className="d-flex flex-column align-items-center">
                    <p>
                        Welcome to my portfolio. My name is Scott and I am a fourth year computer science student at Dalhousie University.
                        I am from Dartmouth, Nova Scotia and went to Prince Andrew High School before attending Dalhousie.
                        I began programming in high school which led me to pursue a degree in computer science.
                        Outside of programming and school I enjoy playing Hockey, Golf, Guitar, Video Games, and spending time with friends and family.
                    </p>
                </section>
                <section>
                    <h4>Contact Form</h4>
                    {formSuccess && <p className="text-success">Your message has been sent successfully!</p>}
                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
                        <input type="text" className={`form-control ${formErrors.name ? "border-danger" : ""}`} 
                            placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
                        {formErrors.name && <p className="text-danger">{formErrors.name}</p>}

                        <input type="email" className={`form-control ${formErrors.email ? "border-danger" : ""}`} 
                            placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                        {formErrors.email && <p className="text-danger">{formErrors.email}</p>}

                        <input type="text" className={`form-control ${formErrors.message ? "border-danger" : ""}`} 
                            placeholder="Message" name="message" value={formData.message} onChange={handleChange} required />
                        {formErrors.message && <p className="text-danger">{formErrors.message}</p>}

                        <input type="text" className={`form-control ${formErrors.subject ? "border-danger" : ""}`} 
                            placeholder="Subject" name="subject" value={formData.subject} onChange={handleChange} required />
                        {formErrors.subject && <p className="text-danger">{formErrors.subject}</p>}

                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="consent-checkbox" 
                                name="consent" checked={formData.consent} onChange={handleChange} />
                            <label htmlFor="consent-checkbox" className="form-check-label">Consent for being contacted using provided information and that information will be stored securely.</label>
                            {formErrors.consent && <p className="text-danger">{formErrors.consent}</p>}
                        </div>
                        <input type="submit" className="btn btn-primary" value="Submit"/>
                    </form>
                </section>
            </section>

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
