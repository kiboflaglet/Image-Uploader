# Image Uploader (React.js + Express.js)

## Description

Image uploader is server based image uploading app, it has drag n drop and state for image to process while you can share the link and download the image from server.

## Demo
[Vercel app](http://example.com)


## Features

- Responsible design for desktop and mobile devices.
- Users can upload an image at a time. The file should be JPG, PNG, or GIF. The maximum size is 2MB.
- Users can drag and drop the file to upload it.
- Users can browse files and select a file to upload.
- When the image is uploading, users can see a loader like in the design.
- When the image is successfully uploaded, users can see the image.
- After the image is uploaded, users can copy its address by selecting the **`Share`** button.
- User can preview the image by going the shared link
- After the image is uploaded, users can download the image by selecting the **`Download`** button.
- Users can change the theme between dark and light.

## **Technical Details**

### **Front-end Development**

1. **Framework**: React for building the user interface.
2. **File Upload**:  **`react-dropzone`** library for drag-and-drop file upload functionality.
3. **Styling**: Tailwind CSS and pure CSS

### **Back-end Development**

1. **Framework**: Node.js with Express.js 
2. **File Storage**: Uses **`multer`**
3. **API Endpoints**:
- POST /api/upload: Image upload and return the image information.
- GET /api/download/:id: Handle image download.