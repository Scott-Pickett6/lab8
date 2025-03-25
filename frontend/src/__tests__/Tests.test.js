import { render, screen } from '@testing-library/react';
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import NotFound from "../pages/NotFound";
import React from 'react';

test("home page renders", () => {
    render(<Home />);
    const linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();
});

test("about page renders", () => {
    render(<About />);
    const linkElement = screen.getByText(/About/i);
    expect(linkElement).toBeInTheDocument();
});

test("projects page renders", () => {
    render(<Projects />);
    const linkElement = screen.getByText(/Projects/i);
    expect(linkElement).toBeInTheDocument();
});

test("not found page renders", () => {
    render(<NotFound />);
    const linkElement = screen.getByText(/Error 404!/i);
    expect(linkElement).toBeInTheDocument();
});