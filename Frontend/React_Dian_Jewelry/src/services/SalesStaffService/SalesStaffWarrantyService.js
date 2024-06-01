import axios from "axios";

const API_BASE_URL_WARRANTY = 'https://localhost:7184/api';

//Get warranty lists

export const fetchAllWarranty = async () => {
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

export const createWarranty = async (orderDetailId, startDate, endDate, status) => {
    return axios.post(`${API_BASE_URL_WARRANTY}/warranties/addwarranty`, {
            orderDetailId, startDate, endDate, status
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  };

// update warranty
export const updateWarranty = async (id) => {
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
export const deleteWarranty = async (id) => {
    return axios.delete(`${API_BASE_URL_WARRANTY}/warranties/delete/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  };