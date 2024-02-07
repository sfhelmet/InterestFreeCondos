import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import Login from "../screens/Login";
import { BrowserRouter } from "react-router-dom";

test("Non SSO Login works", async () => {
    const user = userEvent.setup();
    render(<BrowserRouter><Login /></BrowserRouter>);

    user.type(document.querySelector(".login-email input", "nexusTester@nexusTest.ca"));
    user.type(document.querySelector(".login-password input", "1234567890"));
    user.click(document.querySelector(".login-btn"));

    expect(location.pathname).toBe("/");
})