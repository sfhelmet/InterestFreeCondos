import '@fortawesome/fontawesome-free/css/all.css';
import { getExtension } from './FileExtentionUtil';

const FileIcon = ({ filename }) => {
    return (
      <i className={`fas fa-${getExtension(filename)} mr-2`} id="file-icon"></i>
    )
}

export default FileIcon;