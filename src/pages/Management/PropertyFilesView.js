import { useState } from "react";
import { auth, db } from "../../config/firebase";
import { query, collection, getDocs } from "firebase/firestore" 
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { useEffect } from "react";
import FileIcon from "../../components/Utils/FileIcons"
import PropertyUploadsManager from "./PropertyUploadsManager";


const PropertyFilesView = (props) =>
{
    const [propertyProfiles, setPropertyProfiles] = useState(null);
    const storage = getStorage();

    const handleDeleteConfirmation = (file, property) => {
        if (window.confirm(`Are you sure you want to delete ${file}?`)) {
          deleteFile(file, property);
        }
      };
      
    const deleteFile = (file, property) => {
        
        const newproperties = PropertyUploadsManager.filterPropertyObjects(propertyProfiles, property, file)

        setPropertyProfiles(newproperties);

        PropertyUploadsManager.removeStorafeFile(storage, file, property)
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

            let bundle = { file: file, filename: filename, property: property}; 
            
            let properties = PropertyUploadsManager.uploadStorageFile(storage, bundle, propertyProfiles, setPropertyProfiles);
            setPropertyProfiles(properties);

          });
    };

    useEffect(() => {
        const fetchAllProperties = async () => {
            if (!propertyProfiles && auth.currentUser) {

                // Get properties
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
    }, [propertyProfiles, storage]);




    return (

<div style={{ backgroundColor: "#193446", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
        <div className="container-fluid" style={{ width: "80%", marginTop: "0"}}>
        <h1 style={{color: "#f4f9f9"}}>Property Files View</h1>
          {propertyProfiles ? (propertyProfiles.map( property => (
            <div className="row" key={property.id}>
            <div className="col">
            <div className="card m-2">
              <h5 className="card-header" style={{color: "#7fe6ef",backgroundColor: "#213d4e"}}>{property.name}</h5>
              <div className="card-body" style={{backgroundColor: "#3e8ca3"}}>
                <div className="d-flex justify-content-between">
                  <div className="propertyAddress">{property.address}</div>
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
                    <li className="list-group-item" key={`${file}_${property.id}`} style={{backgroundColor: "#317995"}} >
                      <div className="d-flex justify-content-between">
                        <div>
                          <FileIcon filename={file}></FileIcon>
                          <a id={file} href={`#${file}`} download style={{color: "black"}}>{file}</a>
                        </div>
                        <button type="button" aria-label="Close" style={{border: "none", backgroundColor: "transparent"}}                                       
                                onClick={() => handleDeleteConfirmation(file, property) }>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div> 
                    </li>)) : <li className="list-group-item">No files in directory</li>}
                  </ul>
              </div>
            </div>
            </div>
            </div>))) : (<></>)}
        </div>
    </div>
    )
}



export default PropertyFilesView;