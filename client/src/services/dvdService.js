import api from "../services/api";

// MAIN AXIOS METHODS:
// GET - Menu
function get(sortName, sortOrder) {
  const sortOrderQuery = sortName && sortOrder ? `?sortName=${sortName}&sortOrder=${sortOrder}` : ``
  return api.get(`/api/movie${sortOrderQuery}`);
};

// POST - Add
function post(data) {
  const formData = prepareFormData(data);
  return api.post(
    '/api/movie',
    formData,
    formConfig
  );
};

// GET BY ID - Detail
function getById(id) {
  return api.get('/api/movie/' + id);
};

// PUT - Edit
function put(id, data, uploadedfile) {
  const formData = prepareFormData(data, uploadedfile);
  return api.put(
    '/api/movie/' + id,
    formData,
    formConfig
  );
};

// DELETE - Detail
function del(id) {
  return api.delete('/api/movie/' + id);
};

function search(title) {
  return api.get(`/api/movie/searches?title=${title}`);
}

// REFACTORED VARIABLES/FUNCTIONS: Repeated code better abstracted to keep source code DRY (called above)
// [1] Form Config: sets the content header to form data
const formConfig = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

// [2] Form Data: format of mixed data when uploading files
function prepareFormData(data, uploadedfile) {
  // New instance of class
  let formData = new FormData();

  // Append reconfigured mixed data to new object
  formData.append('title', data.title);
  formData.append('genre', data.genre);
  formData.append('rate', data.rate);
  formData.append('stock', data.stock);
  formData.append('image', data.image);
  if (uploadedfile) {
    formData.append('uploadedFile', uploadedfile)
  }

  // Return restructured form data (for our API)
  return formData;
};

// Create file name from URL in DB
function getFileFromUrl(downloadURL) {
  // Slice off the base URL from downloadURL
  const baseURL = `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_STORAGE_BUCKET_URL}/o/`;
  console.log(baseURL);

  // Remove baseURl from downloadURL
  let fileGlob = downloadURL.replace(baseURL, "");

  // Remove everything after the query string(?)
  const indexOfEndPath = fileGlob.indexOf("?");
  fileGlob = fileGlob.substring(0, indexOfEndPath);

  // Return existing uploaded file glob
  console.log(`Generated File Glob: ${fileGlob}`);
  return fileGlob;
};


const dvdService = {
  get,
  post,
  getById,
  put,
  del,
  search,
  getFileFromUrl
}

export default dvdService;