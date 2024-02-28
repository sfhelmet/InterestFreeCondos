import { useState } from "react";
import { auth, db } from "../config/firebase";
import { query, collection, getDocs, updateDoc, doc} from "firebase/firestore" 
import { getStorage, uploadBytes, ref, getDownloadURL, deleteObject } from "firebase/storage"
import { useEffect } from "react";
import Center from "../components/utils/Center";
import '@fortawesome/fontawesome-free/css/all.css';


const PropertyFilesView = (props) =>
{

    const [propertyProfiles, setPropertyProfiles] = useState(null);

    const storage = getStorage();

    const getFileIcon = (file) => {
        let extension = file.split('.').pop();
        switch (extension.toLowerCase()) {
            case 'pdf':
              return 'file-pdf';
            case 'doc':
            case 'docx':
              return 'file-word';
            case 'xls':
            case 'xlsx':
              return 'file-excel';
            case 'txt':
                return 'file-text'
              default:
              return 'file';
          }
    }

    const handleDeleteConfirmation = (file, property) => {
        if (window.confirm(`Are you sure you want to delete ${file}?`)) {
          deleteFile(file, property);
        }
      };
      
      const deleteFile = (file, property) => {
        
        
        const newproperties = propertyProfiles.map(item => {
            if (item.id === property.id && item.files) {
              item.files = item.files.filter(f => f !== file);
            }
            return item;
          });

        setPropertyProfiles(newproperties);

        // Remove from storage
        const property_files_ref = ref(storage, `property_files/${file}`)
        
        deleteObject(property_files_ref).then(() => {
            // Remove from db list
            const docRef = doc(db, "properties", property.id);
            updateDoc(docRef, {files: property.files.filter(item => item !== file)})

            console.log("Delete file - OK");
        })
      };
      

    const handleUploadFileClick = (property) => {
        document.getElementById(`fileInput_${property.id}`).click();
    };

    const handleFileSelection = (property, event) => {
        // Handle the selected files
        const selectedFiles = event.target.files;

        // Process each selected file
        Array.from(selectedFiles).forEach(async (file) => {

            // Rename with timestamp
            const timestamp = new Date().getTime();
            const formattedTimestamp = new Date(timestamp).toISOString().replace(/[-T:.Z]/g, '_');
            const filename = `${formattedTimestamp}_${file.name.replace(/ /g, '_')}`;

            // Upload new file in storage
            const property_files_ref = ref(storage, `property_files/${filename}`)
            uploadBytes(property_files_ref, file).then((snapshot) => {

                // Upload file array of properties table
                const docRef = doc(db, "properties", property.id);
                updateDoc(docRef, {files: [...property.files, filename]}).then(async () =>
                    {
                        // Modify file list
                        const newproperties = propertyProfiles.map(item => {
                            if (item.id === property.id && item.files) {
                              item.files.push(filename);
                            }
                            return item;
                          });
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
        });
    };

    useEffect(() => {

        const fetchAllProperties = async () => {
            if (!propertyProfiles && auth.currentUser) {
                const usersRef = collection(db, "properties");
                const userQuery = query(usersRef);
                getDocs(userQuery).then(docs => {
                    let properties = [];
                    docs.forEach(doc => {
                        const data = doc.data();
                        data.id = doc.id;
                        properties.push(data);

                        data.files.forEach( async (filename) => {
                            await getDownloadURL(ref(storage, `property_files/${filename}`)).then(url =>
                                {
                                    const fileanchor = document.getElementById(filename);
                                    fileanchor.setAttribute('href', url);
                                })
                        })
                    })
                    setPropertyProfiles(properties);
                })
            }
        };

        fetchAllProperties();
    }, []);




    return (

    <div style={{"backgroundColor": "#193446"}}>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
      <Center>
        <div className="properties" style={{ width: "80%"}}>
          <div className="card-group" >
          {propertyProfiles ? (propertyProfiles.map( property => (
            <div className="card" >
              <h5 className="card-header">{property.propertyName}</h5>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="propertyAddress">{property.fullAddress}</div>
                  <button type="button" className="btn btn-primary" 
                          style={{ backgroundColor: "#317995", color: "#F4F9F9", border: "none"}}
                          onClick={() => handleUploadFileClick(property)}>
                  Upload File
                  </button>
                  <input type="file" id={`fileInput_${property.id}`} style={{ display: 'none' }}
                  onChange={(e) => handleFileSelection(property, e)} multiple/>
                </div>
                  <p className="card-text">Files</p>
                  <ul className="fileList list-group">
                  {property.files && property.files.length > 0 ? (property.files.map( file =>
                    <li className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <div>
                          <i className={`fas fa-${getFileIcon(file)} mr-2`}></i>
                          <a id={file} target="_blank" download>{file}</a>
                        </div>
                        <button type="button" aria-label="Close" style={{border: "none", backgroundColor: "transparent"}}                                       
                                onClick={() => handleDeleteConfirmation(file, property) }>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div> 
                    </li>)) : <li className="list-group-item"><a>No files in directory</a></li>}
                  </ul>
                </div>
                </div>))) : (<></>)}
            </div>
        </div>
      </Center>
    </div>
    )
}



export default PropertyFilesView;