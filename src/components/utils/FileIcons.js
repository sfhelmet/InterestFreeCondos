import '@fortawesome/fontawesome-free/css/all.css';


const FileIcon = ({ filename }) => {

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

    return (

      <i className={`fas fa-${getFileIcon(filename)} mr-2`}></i>


    )


}


export default FileIcon;