import { db } from "../../config/firebase";
import { updateDoc, doc} from "firebase/firestore" 
import { uploadBytes, ref, getDownloadURL, deleteObject } from "firebase/storage"

class PropertyUploadsManager {

    static uploadStorageFile = (storage, {file, filename, property}, propertyProfiles, setPropertyProfiles) => {
        // Upload new file in storage

        const property_files_ref = ref(storage, `property_files/${filename}`)
        uploadBytes(property_files_ref, file).then((snapshot) => {

            // Upload file array of properties table
            const docRef = doc(db, "properties", property.id);
            updateDoc(docRef, {files: [...property.files, filename]}).then(async () =>
                {
                    // Modify file list
                    const newproperties = this.modifyPropertyObjects(propertyProfiles, property, filename);
                    setPropertyProfiles(newproperties);

                    // Modify in-place the anchor of the file
                    await getDownloadURL(ref(storage, `property_files/${filename}`)).then(url =>
                        {
                            const fileanchor = document.getElementById(filename);
                            fileanchor.setAttribute('href', url);
                        })
                }
            )

            console.log("File upload - OK")
          });  
    }

    static filterPropertyObjects = (propertyProfiles, property, file) => {
        return propertyProfiles.map(item => {
            if (item.id === property.id && item.files) {
              item.files = item.files.filter(f => f !== file);
            }
            return item;
          });
    }

    static modifyPropertyObjects = (propertyProfiles, property, filename) => {
        return propertyProfiles.map(item => {
            if (item.id === property.id && item.files) {
              item.files.push(filename);
            }
            return item;
          });
    }

    static removeStorafeFile = (storage, file, property) => {
                // Remove from storage
                const property_files_ref = ref(storage, `property_files/${file}`)
        
                deleteObject(property_files_ref).then(() => {
                    // Remove from db list
                    const docRef = doc(db, "properties", property.id);
                    updateDoc(docRef, {files: property.files.filter(item => item !== file)})
        
                    console.log("Delete file - OK");
                })
    }

}



export default PropertyUploadsManager;