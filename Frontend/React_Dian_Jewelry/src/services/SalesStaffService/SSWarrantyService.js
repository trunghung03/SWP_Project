import axios from "axios";

// const API_BASE_URL_WARRANTY = 'https://localhost:7184/api';
const API_BASE_URL_WARRANTY = process.env.REACT_APP_API_BASE_URL;
//Get warranty lists

const fetchAllWarranty = async () => {
  return axios.get(`${API_BASE_URL_WARRANTY}/warranties/all`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

const fetchWarrantyDetail = async (id) => {
  return axios.get(`${API_BASE_URL_WARRANTY}/warranties/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

// create new warranty

const createWarranty = async (data) => {
  const response = await axios.post(`${API_BASE_URL_WARRANTY}/warranties/addwarranty`, data);
  return response.data;
};
// update warranty
const updateWarranty = async (id) => {
  return axios.put(`${API_BASE_URL_WARRANTY}/warranties/update/${id}`, {

  })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

// delete warranty
const deleteWarranty = async (id,data) => {
  return axios.delete(`${API_BASE_URL_WARRANTY}/warranties/delete/${id}`,data)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

export { fetchAllWarranty, updateWarranty, deleteWarranty,fetchWarrantyDetail, createWarranty };