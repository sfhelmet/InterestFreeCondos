import '@testing-library/jest-dom';
import { render, act, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import RequestSubmission from '../../../../pages/Requests/Submissions/RequestSubmission';
import RequestService from '../../../../pages/Requests/RequestService';

jest.mock('../../../../config/firebase', () => {
    const ogModule = jest.requireActual('../../../../config/firebase');
    return {
        ...ogModule,
        auth: {
            currentUser: {
                uid: "test"
            }
        }
    };
});

jest.mock('firebase/firestore', () => {
    const ogModule = jest.requireActual('firebase/firestore');
    return {
        ...ogModule,
        addDoc: jest.fn(() => Promise.resolve()),
        collection: jest.fn()
    };
});

jest.mock('../../../../pages/Requests/RequestService', () => {
    const ogModule = jest.requireActual('../../../../pages/Requests/RequestService')
    return {
        ...ogModule,
        uploadRequest: jest.fn(),
        getTemplateRequest: jest.fn(() => (        {
            userID: "1",   // User that submitted
            handlingStatus: "Submitted",    // Submitted Processing Closed
            title: "",                      // Title
            action: "Custom ticket",        // Type of request
            notes: ""                       // Free comments from the user
        }))
    }
})

test('Rendering Request Submission Page Works', () => {
    render(
        <BrowserRouter>
            <RequestSubmission />
        </BrowserRouter>
    );

    const formHeading = screen.getByText("Request submission");
    const requestSubmissionHeader = screen.getByText("Open a request ticket");
    const titleInput = screen.getByLabelText("Title");
    const requestType = screen.getByLabelText("What would you like to request?");
    const description = screen.getByLabelText("Description (optional)");

    expect(formHeading).toBeInTheDocument();
    expect(requestSubmissionHeader).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(requestType).toBeInTheDocument();
    expect(description).toBeInTheDocument();
});

test('Request Submission Page Works', () => {
    window.alert = jest.fn();
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(
        <BrowserRouter>
            <RequestSubmission />
        </BrowserRouter>
    );

    const titleInput = screen.getByLabelText("Title");
    const requestType = screen.getByLabelText("What would you like to request?");
    const description = screen.getByLabelText("Description (optional)");
    const submitBtn = screen.getByText("Submit");

    act(() => {
        fireEvent.change(titleInput, { target: { value: "Test Submission" }});
    });
    expect(titleInput.value).toBe("Test Submission");

    act(() => {
        fireEvent.change(requestType, { target: { value: "Reporting a deficiency" }});
    });
    expect(requestType.value).toBe("Reporting a deficiency");

    act(() => {
        fireEvent.change(description, { target: { value: "Test Request" }});
    });
    expect(description.value).toBe("Test Request");

    fireEvent.click(submitBtn);

    expect(RequestService.uploadRequest).toHaveBeenCalled();
});


test('Request Submission Fails on empty title', () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(
        <BrowserRouter>
            <RequestSubmission />
        </BrowserRouter>
    );

    const titleInput = screen.getByLabelText("Title");

    fireEvent.change(titleInput, { target: { value: "" }});
    expect(titleInput.value).toBe("");

    const submitBtn = screen.getByText("Submit");
    fireEvent.click(submitBtn);

    expect(mockAlert).toHaveBeenCalledWith("Your request is missing a title.");
});