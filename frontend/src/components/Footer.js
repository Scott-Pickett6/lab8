function Footer({ theme }) {
    return (
        <footer className={`d-flex justify-content-center border-top border-${theme === "dark" ? "white" : "black"} mt-4`}>
            <p className="mt-4">3172 - Portfolio - Scott Pickett</p>
        </footer>
    );
}

export default Footer;