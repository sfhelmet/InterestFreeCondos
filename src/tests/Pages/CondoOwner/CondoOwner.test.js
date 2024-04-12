import { render, waitFor, fireEvent, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import OwnerHome from "../../../pages/HomePage/Dashboards/CondoOwner/OwnerHome";
import { BrowserRouter } from "react-router-dom";
import AuthenticatedUserContext from "../../../contexts/AuthenticatedUserContext";
import { updateDoc } from "firebase/firestore";

jest.mock("firebase/storage", () => {
    const ogModule = jest.requireActual("firebase/storage")
    return {
        ...ogModule,
        getDownloadURL: jest.fn(() => Promise.resolve()),
        ref: jest.fn()
    }
});

jest.mock("firebase/firestore",() => {
    const ogModule = jest.requireActual("firebase/firestore");
    return {
        ...ogModule,
        getDocs: jest.fn().mockResolvedValue({ docs: [
            {
                data: jest.fn().mockReturnValue({              "imageFileName": "condoUnit1.jpg",
                    ownerId: "F6RHeYYq0519ycctpPd3",
                    isEditing: false,
                    receivedMoney: "$3000",
                    renterId: "FLCYkbgAxuvK8G3JVMuE",
                    unit: "101",
                    propertyId: "1",
                    propertyImageURL: "https://firebasestorage.googleapis.com/v0/b/ifcondos.appspot.com/o/sampleCondoUnits%2FcondoUnit1.jpg?alt=media&token=7b7a4d04-b98a-4533-a679-e42ff4ef8240",
                    monthlyRent: "$1500",
                    buildingName: "Example Tower",
                    balanceDue: "$200",
                    renterName: "John Doe",
                    dueDate: "2024-05-31",
                    id: 1,
                    address: "123 Main St"
                })
            },
            {
                data: jest.fn().mockReturnValue({
                    renterId: "",
                    monthlyRent: "$1800",
                    id: 2,
                    ownerId: "",
                    propertyId: "1",
                    balanceDue: "$250",
                    address: "456 Elm St",
                    unit: "202",
                    imageFileName: "condoUnit2.jpg",
                    dueDate: "2024-03-05",
                    renterName: "Jane Smith",
                    receivedMoney: "$3500",
                    buildingName: "Sample Apartment",
                    propertyImageURL: "https://firebasestorage.googleapis.com/v0/b/ifcondos.appspot.com/o/sampleCondoUnits%2FcondoUnit2.jpg?alt=media&token=ef87a0a3-ce6b-4e14-a625-db4de45acba6",
                    isEditing: false
                })

            },
            {
                data: jest.fn().mockReturnValue({
                    receivedMoney: "$3500",
                    imageFileName: "condoUnit3.jpg",
                    monthlyRent: "$1800",
                    renterId: "",
                    balanceDue: "$250",
                    unit: "303",
                    renterName: "Jane Smith",
                    dueDate: "2024-03-05",
                    buildingName: "Sample Apartment",
                    propertyId: "1",
                    address: "456 Elm St",
                    ownerId: "",
                    id: 3,
                    propertyImageURL: "https://firebasestorage.googleapis.com/v0/b/ifcondos.appspot.com/o/sampleCondoUnits%2FcondoUnit3.jpg?alt=media&token=7569fe9b-95d2-4ae9-a8c7-1fb42c88a428",
                    isEditing: false
                })
            },
            {
                data: jest.fn().mockReturnValue({
                    ownerId: "",
                    renterId: "",
                    address: "456 Elm St",
                    unit: "404",
                    buildingName: "Sample Apartment",
                    renterName: "Jane Smith",
                    monthlyRent: "$1800",
                    dueDate: "2024-03-05",
                    imageFileName: "condoUnit4.jpg",
                    propertyId: "2",
                    id: 4,
                    receivedMoney: "$3500",
                    balanceDue: "$250",
                    propertyImageURL: "https://firebasestorage.googleapis.com/v0/b/ifcondos.appspot.com/o/sampleCondoUnits%2FcondoUnit4.jpg?alt=media&token=5af3aae9-e0c1-4717-8029-149ddcc3849f",
                    isEditing: false
                })
            }
          ]}),
          updateDoc: jest.fn(() => Promise.resolve())
    }
});

jest.requireActual("../../../config/firebase.js");

test('Rendering CondoOwner Works', () => {
    render(<BrowserRouter><OwnerHome /></BrowserRouter>);
    const leftLinkPanel = document.querySelector("div.left-panel");
    const companyLogo = document.querySelector('img.logo');
    const rightLinkPanel = document.querySelector('div.right-panel');
    const viewMoreBtn = document.querySelector('div.view-more');
  
    expect(leftLinkPanel).toBeInTheDocument();
    expect(companyLogo).toBeInTheDocument();
    expect(rightLinkPanel).toBeInTheDocument();
    expect(viewMoreBtn).toBeInTheDocument();
});

test("Fetching Properties works", async () => {
    render(
        <BrowserRouter>
            <AuthenticatedUserContext.Provider value={{ 
                    userID: "D4flx9lDvqeQ8jYAxIFRdt4o8Gz2",
                    userName:"Pol",
                    email:"abc@gmail.com",
                    phone:"123-456-7899"
                }}
            >
                <OwnerHome />
            </AuthenticatedUserContext.Provider>
        </BrowserRouter>
    );

    await waitFor(() => {
        const unit101 = document.querySelector("div#property-1");
        const unit202 = document.querySelector("div#property-2");
        const unit303 = document.querySelector("div#property-3");
        const unit404 = document.querySelector("div#property-4");

        expect(unit101).toBeInTheDocument();
        expect(unit202).toBeInTheDocument();
        expect(unit303).toBeInTheDocument();
        expect(unit404).toBeInTheDocument();
    })
});

test('Updates property attribute on toggle edit change', async () => {
    const logSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    const { getAllByText, getByText, getByPlaceholderText } = render(
        <BrowserRouter>
            <AuthenticatedUserContext.Provider value={{ 
                    userID: "D4flx9lDvqeQ8jYAxIFRdt4o8Gz2",
                    userName:"Pol",
                    email:"abc@gmail.com",
                    phone:"123-456-7899"
                }}
            >
                <OwnerHome />
            </AuthenticatedUserContext.Provider>
        </BrowserRouter>
    );

    await waitFor(() => {
        expect(getByText("Example Tower")).toBeInTheDocument();
    });

    act(() => {
        fireEvent.click(getAllByText("Edit")[0]);
    })

    const balanceDueInput = getByPlaceholderText('Balance Due');
    expect(balanceDueInput).toBeInTheDocument();

    act(() => {
        user.clear(balanceDueInput);
        user.type(balanceDueInput, "0$");
    });

    const saveBtn = getByText("Save");
    act(() => {
        fireEvent.click(saveBtn);
    });

    expect(updateDoc).toHaveBeenCalled();
    expect(logSpy).not.toHaveBeenCalled();
});

test('Updates property attribute on toggle edit change', async () => {
    const logSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    const { getAllByText, getByText, getByPlaceholderText } = render(
        <BrowserRouter>
            <AuthenticatedUserContext.Provider value={{ 
                    userID: "D4flx9lDvqeQ8jYAxIFRdt4o8Gz2",
                    userName:"Pol",
                    email:"abc@gmail.com",
                    phone:"123-456-7899"
                }}
            >
                <OwnerHome />
            </AuthenticatedUserContext.Provider>
        </BrowserRouter>
    );

    await waitFor(() => {
        expect(getByText("Example Tower")).toBeInTheDocument();
    });

    act(() => {
        fireEvent.click(getAllByText("Edit")[0]);
    })

    const balanceDueInput = getByPlaceholderText('Balance Due');
    expect(balanceDueInput).toBeInTheDocument();

    const monthlyRentInput = getByPlaceholderText("Monthly Rent")
    expect(monthlyRentInput).toBeInTheDocument();

    const dueDateInput = getByPlaceholderText("Due Date");
    expect(dueDateInput).toBeInTheDocument();

    const receivedMoneyInput = getByPlaceholderText("Received Money");
    expect(receivedMoneyInput).toBeInTheDocument();

    act(() => {
        user.clear(balanceDueInput);
        user.type(balanceDueInput, "0$");

        user.clear(monthlyRentInput);
        user.type(monthlyRentInput, "100$");

        user.clear(dueDateInput);
        user.type("2024-06-06");

        user.clear(receivedMoneyInput);
        user.type(receivedMoneyInput, "100$");
    });

    const saveBtn = getByText("Save");
    act(() => {
        fireEvent.click(saveBtn);
    });

    expect(updateDoc).toHaveBeenCalled();
    expect(logSpy).not.toHaveBeenCalled();
});