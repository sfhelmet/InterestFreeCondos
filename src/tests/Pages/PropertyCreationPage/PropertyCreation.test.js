import '@testing-library/jest-dom';
import { render, act, screen, fireEvent, waitFor } from "@testing-library/react";
import PropertyForm from "../../../pages/PropertyCreation/PropertyCreation";
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { addDoc } from 'firebase/firestore';
import { uploadBytes } from 'firebase/storage';


jest.mock("firebase/firestore", () => {
    const ogModule = jest.requireActual("firebase/firestore");
    return {
        ...ogModule,
        collection: jest.fn(),
        addDoc: jest.fn().mockResolvedValue({ 
            id: 1,
            name: "Concordia H7 Housing",
            unitCount: "120",
            parkingCount: "120",
            lockerCount: "120",
            address: "123 Bishop St",
            files: ["test.png"]
        })
    } 
});

jest.mock("firebase/storage", () => {
    const ogModule = jest.requireActual("firebase/storage");
    return {
        ...ogModule,
        uploadBytes: jest.fn(() => Promise.resolve()),
        ref: jest.fn()
    }
});

jest.requireActual("../../../config/firebase.js");

test('Rendering Property Creation Page Works', () => {
    const { getByText, getByLabelText } = render(<BrowserRouter><PropertyForm /></BrowserRouter>);
    const formHeading = getByText("Create Property Profile");
    const propertyName = getByLabelText("Property Name:");
    const unitCount = getByText("Unit Count:");
    const parkingCount = getByText("Parking Count:");
    const lockerCount = getByText("Locker Count:");
    const addressLabel = getByText("Address:");
    const imagesLabel = getByText("Images:");
    const createBtn = getByText("Create Property");

    expect(formHeading).toBeInTheDocument();
    expect(propertyName).toBeInTheDocument();
    expect(unitCount).toBeInTheDocument();
    expect(parkingCount).toBeInTheDocument();
    expect(lockerCount).toBeInTheDocument();
    expect(addressLabel).toBeInTheDocument();
    expect(imagesLabel).toBeInTheDocument();
    expect(createBtn).toBeInTheDocument();
});

test('Property Creation Works', async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();

    render(<BrowserRouter><PropertyForm /></BrowserRouter>);

    const propertyNameInput = screen.getByLabelText("Property Name:");
    const unitCountInput = screen.getByLabelText("Unit Count:");
    const parkingCountInput = screen.getByLabelText("Parking Count:");
    const lockerCountInput = screen.getByLabelText("Locker Count:");
    const addressInput = screen.getByLabelText("Address:");
    const filesInput = screen.getByLabelText("Images:");
    const createBtn = screen.getByText("Create Property");

    act(() => {
        fireEvent.change(propertyNameInput, { target: { value: "Concordia H7 Housing" }});
    });
    expect(propertyNameInput.value).toBe("Concordia H7 Housing");

    act(() => {
        fireEvent.change(unitCountInput, { target: { value: "120" }});
    });
    expect(unitCountInput.value).toBe("120");

    act(() => {
        fireEvent.change(parkingCountInput, { target: { value: "120" }});
    });
    expect(parkingCountInput.value).toBe("120");

    act(() => {
        fireEvent.change(lockerCountInput, { target: { value: "120" }});
    });
    expect(lockerCountInput.value).toBe("120")

    act(() => {
        fireEvent.change(addressInput, { target: { value: "123 Bishop St" }});
    });
    expect(addressInput.value).toBe("123 Bishop St");

    act(() => {
        fireEvent.change(filesInput, { 
            target: { 
                files: [new File(['(⌐□_□)'], 'test.png', {type: 'image/png'})], 
            }
        });
    });
    expect(filesInput.files[0].name).toBe("test.png");
    
    user.click(createBtn);

    await waitFor(() => {
        expect(addDoc).toHaveBeenCalled();
        expect(uploadBytes).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Property created with ID:",1);
    });
});

test('Property Creation Fails', async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();

    addDoc.mockRejectedValue(new Error("Error adding property: Concordia H7 Housing"));

    render(<BrowserRouter><PropertyForm /></BrowserRouter>);

    const propertyNameInput = screen.getByLabelText("Property Name:");
    const unitCountInput = screen.getByLabelText("Unit Count:");
    const parkingCountInput = screen.getByLabelText("Parking Count:");
    const lockerCountInput = screen.getByLabelText("Locker Count:");
    const addressInput = screen.getByLabelText("Address:");
    const filesInput = screen.getByLabelText("Images:");
    const createBtn = screen.getByText("Create Property");

    act(() => {
        fireEvent.change(propertyNameInput, { target: { value: "Concordia H7 Housing" }});
    });
    expect(propertyNameInput.value).toBe("Concordia H7 Housing");

    act(() => {
        fireEvent.change(unitCountInput, { target: { value: "120" }});
    });
    expect(unitCountInput.value).toBe("120");

    act(() => {
        fireEvent.change(parkingCountInput, { target: { value: "120" }});
    });
    expect(parkingCountInput.value).toBe("120");

    act(() => {
        fireEvent.change(lockerCountInput, { target: { value: "120" }});
    });
    expect(lockerCountInput.value).toBe("120")

    act(() => {
        fireEvent.change(addressInput, { target: { value: "123 Bishop St" }});
    });
    expect(addressInput.value).toBe("123 Bishop St");

    act(() => {
        fireEvent.change(filesInput, { 
            target: { 
                files: [new File(['(⌐□_□)'], 'test.png', {type: 'image/png'})], 
            }
        });
    });
    expect(filesInput.files[0].name).toBe("test.png");
    
    user.click(createBtn);

    await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalled();
    });
});