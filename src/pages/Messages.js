import { useEffect, useState } from "react";

function Messages() {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch("/.netlify/functions/api/messages");
                if (!response.ok) {
                    throw new Error("Failed to fetch messages");
                }
                const data = await response.json();
                setMessages(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchMessages();
    }, []);

    return (
        <main className="container d-flex flex-column align-items-center">
            <h2>Messages</h2>
            <section className="d-flex flex-column gap-3 w-100">
                {error && <p className="text-danger">Error: {error}</p>}
                {messages.length === 0 ? (
                    <p>No messages submitted yet.</p>
                ) : (
                    messages.map((message, index) => (
                        <div key={index} className="border p-3 rounded shadow-sm">
                            <h5>{message.subject}</h5>
                            <p><strong>From:</strong> {message.name}</p>
                            <p><strong>Message:</strong> {message.message}</p>
                        </div>
                    ))
                )}
            </section>
        </main>
    );
}

export default Messages;
