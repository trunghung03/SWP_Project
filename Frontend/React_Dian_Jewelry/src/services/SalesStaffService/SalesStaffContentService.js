import axios from "axios";


const API_BASE_URL_BLOG = 'https://localhost:7184/api';

//Get all content lists

 const fetchAllContent = async () => {
  return axios.get(`${API_BASE_URL_BLOG}/article`);
};

//get content detail by id

 const fetchContentDetail = async (id) => {
  return axios.get(`${API_BASE_URL_BLOG}/article/${id}`);
}

// create new content

 const createContent = async (title, content, image, createdOn, 
  createdBy, status, tag) => {
  return axios.post(`${API_BASE_URL_BLOG}/article/addcontent`, {
       title, content, image, createdOn, createdBy, status, tag 
  })
  .then((response) =>{
      return response.data;
  })
};

// update content

 const updateContent = async (id, blogData) => {
  return axios.put(`${API_BASE_URL_BLOG}/article/update/${id}`, {
    title: blogData.title,
    tag: blogData.tag,
    content: blogData.content,
    image: blogData.image,
    status: blogData.status,
  })
  .then((response) => {
      return response.data;
  })
  .catch(function (error) {
    return error;
  });
};

// delete content
 const deleteContent = async (id) => {
  return axios.delete(`${API_BASE_URL_BLOG}/article/delete/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

export{fetchAllContent, fetchContentDetail, createContent, updateContent, deleteContent};