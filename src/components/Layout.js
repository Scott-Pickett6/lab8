import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
    const [theme, setTheme] = useState(function(){
        return localStorage.getItem("theme") || "dark";
    });

    function toggleTheme(){
        const newTheme = theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-bs-theme", newTheme);
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", theme);
    }, [theme]);

    return (
        <div>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <div style={{ marginTop: "28vh" }}>
                <Outlet />
            </div>
            <Footer theme={theme} />
        </div>
    );
}

export default Layout;