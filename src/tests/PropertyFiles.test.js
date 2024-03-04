import '@testing-library/jest-dom';
import PropertyUploadsManager from "../Pages/Management/PropertyUploadsManager";
import { getStorage } from "firebase/storage"


test("Filtering property objects works", async () => {
    
    let propertyProfiles = 
    [
        {
            id: 1,
            files: ['file1.txt', 'file2.txt', 'file3.txt']
        },
        {
            id: 2,
            files: ['file4.txt', 'file5.txt']
        },
        {
            id: 3,
            files: ['file6.txt']
        }
    ]

    let property = { id: 2};
    let file = 'file4.txt';

    let newProperties = PropertyUploadsManager.filterPropertyObjects(propertyProfiles, property, file)
    let propertyWithRemovedFile = newProperties.find(item => item.id === 2);

    expect(propertyWithRemovedFile.files).not.toContain(file);

})


test("Modifying property objects works", async () => {
    
    let propertyProfiles = 
    [
        {
            id: 1,
            files: ['file1.txt', 'file2.txt', 'file3.txt']
        },
        {
            id: 2,
            files: ['file4.txt', 'file5.txt']
        }
    ]

    let property = { id: 1};
    let filename = 'file0.txt';

    let newProperties = PropertyUploadsManager.modifyPropertyObjects(propertyProfiles, property, filename)
    let propertyWithRemovedFile = newProperties.find(item => item.id === 1);

    expect(propertyWithRemovedFile.files).toContain(filename);

})