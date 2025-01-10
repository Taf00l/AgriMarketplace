import React from "react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "../Jxs Componetnts/About";
describe("About", () => {
  it("should render the About component", () => {
    render(<About />);
    const aboutElement = screen.getByRole("heading", { level: 1 });
    expect(aboutElement).toBeInTheDocument();
  });

  it("should have the text 'about'", () => {
    render(<About />);
    const text = screen.queryByText(/about/i);
    expect(text).toBeInTheDocument();
  });
});
