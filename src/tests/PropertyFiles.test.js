import '@testing-library/jest-dom';
import PropertyUploadsManager from "../Pages/Management/PropertyUploadsManager";
import { storage } from '../config/firebase';


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

});

test("Remove file from storage works", () => {

    const file = new File([''], 'empty.txt', { type: 'text/plain' })

    expect(PropertyUploadsManager.removeStorafeFile(storage, file, {id: 1000, files: []})).toBeUndefined();
})

test("Upload file from storage works", () => {

    const file = new File([''], 'empty.txt', { type: 'text/plain' })

    let bundle =  {file: file, filname: file.name, property: {id: 10000, files: []}}
    let properties = [bundle.property]
    const setProperties = (properties) => {}
    expect(PropertyUploadsManager.uploadStorageFile(storage, bundle, properties, setProperties)).toBeUndefined();
})