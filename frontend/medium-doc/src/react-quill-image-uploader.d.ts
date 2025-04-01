declare module 'react-quill-image-uploader' {
    interface UploadHandler {
      upload: (file: File) => Promise<string>;
    }
  
    export default function ReactQuillImageUploader(options: UploadHandler): any;
  }
  