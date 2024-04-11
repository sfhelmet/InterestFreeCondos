export const getExtension = (file) => {
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