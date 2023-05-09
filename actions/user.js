import fetch from "isomorphic-fetch";
import axios from "axios";
import { removeCookie, removeLocalStorage } from "./auth";
import queryString from "query-string";

// import Router from "next/router";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

if (process.env.NEXT_PUBLIC_PRODUCTION == true) {
  API = process.env.NEXT_PUBLIC_API_PRODUCTION;
}

export const oneUser = (id, token) => {
  // console.log(id, token);
  let url = `${API}/users/${id}`;

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const updateUser = async (id, data, token) => {
  // console.log(data, token);
  let url = `${API}/users/${id}`;
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

export const updateUserPassword = (id, user, token) => {
  let url = `${API}/users/updateMyPassword/${id}`;
  // console.log(id, user, token);

  return fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const createUser = async (data, token) => {
  console.log(token);
  let url = `${API}/users/`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
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

export const allUsers = (paramsData, token) => {
  let url = `${API}/users`;

  return axios(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    params: {
      limit: paramsData.limit,
      page: paramsData.page,
      name: paramsData.name,
      hospitalName: paramsData.hospitalName,
      // nic: paramsData.nic,
      // sort: paramsData.sort,
    },
    // params: { ...query },
    // params: {
    //   limit: paramsData.limit,
    //   page: paramsData.page,
    //   brandname: paramsData.brandname,
    //   location: paramsData.location,
    //   "price[gte]": paramsData.priceMin,
    //   "price[lte]": paramsData.priceMax,
    //   sort: paramsData.sort,
    // },
  })
    .then((response) => {
      //   console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
