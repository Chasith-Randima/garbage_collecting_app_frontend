import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import axios from "axios";

// import Router from "next/router";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

if (process.env.NEXT_PUBLIC_PRODUCTION == true) {
  API = process.env.NEXT_PUBLIC_API_PRODUCTION;
}

export const createIncident = async (data, token) => {
  console.log(token);
  let url = `${API}/incidents/`;
  return fetch(url, {
    method: "POST",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
    .then((response) => {
      //   console.log(response.statusText);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const allIncidents = (paramsData) => {
  let url = `${API}/incidents`;

  return axios(url, {
    method: "GET",
    // params: { ...query },
    params: {
      page: paramsData.page,
      limit: paramsData.limit,
      user: paramsData.user,
      checked: paramsData.checked,
      closed: paramsData.closed,

      //   brandname: paramsData.brandname,
      //   location: paramsData.location,
      //   "price[gte]": paramsData.priceMin,
      //   "price[lte]": paramsData.priceMax,
      //   sort: paramsData.sort,
    },
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const oneIncident = (id) => {
  let url = `${API}/incidents/${id}`;

  return axios(url, {
    method: "GET",
    // params: { ...query },
    // params: {
    //   page: paramsData.page,
    //   limit: paramsData.limit,
    //   name: paramsData.name,
    //   city: paramsData.city,
    //   //   brandname: paramsData.brandname,
    //   //   location: paramsData.location,
    //   //   "price[gte]": paramsData.priceMin,
    //   //   "price[lte]": paramsData.priceMax,
    //   //   sort: paramsData.sort,
    // },
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const updateIncident = async (id, data, token) => {
  console.log(id, data, token);
  let url = `${API}/incidents/${id}`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
    // body: JSON.stringify(data),
  })
    .then((response) => {
      //   console.log(response.statusText);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const deleteIncident = async (id, token) => {
  // console.log(data, token);
  let url = `${API}/incidents/${id}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(data),
  })
    .then((response) => {
      //   console.log(response.statusText);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
