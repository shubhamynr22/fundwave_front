import axios from "axios";

class Service {
  constructor() {
    let service = axios.create({
      headers: { "Content-Type": "application/json" },
    });
    this.handleError = this.handleError.bind(this); // Binding the context
    this.handleSuccess = this.handleSuccess.bind(this); // Binding the context
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
    this.storeData = {};
    this.navigateObj = {};
  }

  setStoreDataForService(storeDataParam = {}) {
    this.storeData = storeDataParam;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    console.log("ERROR");
    if (error.response.status === 400) {
      console.log(error);
      return error;
    }
    if (error.response.status === 401) {
      // if unauthorized, redirect to signUp
      console.log("resetting creds");
      localStorage.removeItem("Authorization");
      sessionStorage.removeItem("uuid");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("leads");
      sessionStorage.removeItem("lead");
      window.location.href = window.location.origin + "/login";
    }
  }

  get(path) {
    return this.service.get(path, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: localStorage.getItem("Authorization"),
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": " GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
      },
    });
  }

  patch(path, payload) {
    return this.service.request({
      method: "PATCH",
      url: path,
      responseType: "json",
      data: payload,
      headers: { Authorization: localStorage.getItem("Authorization") },
    });
  }

  post(path, payload) {
    return this.service.request({
      method: "POST",
      url: path,
      responseType: "json",
      data: payload,
      headers: { Authorization: localStorage.getItem("Authorization") },
      timeout: 100000,
    });
  }

  postBlob(path, payload) {
    return this.service.request({
      method: "POST",
      url: path,
      responseType: "blob",
      data: payload,
      headers: { Authorization: localStorage.getItem("Authorization") },
    });
  }

  // postDownload(path, payload) {
  //   return this.service.request({
  //     method: "POST",
  //     url: path,
  //     responseType: "blob",
  //     data: payload,
  //     headers: { Authorization: localStorage.getItem("Authorization") },
  //   });
  // }

  postDownload(path, fileName, payload) {
    axios({
      url: path,
      method: "POST",
      data: payload,
      headers: { Authorization: localStorage.getItem("Authorization") },
      responseType: "blob", // Important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); //or any other extension
      // document.body.appendChild(link);
      link.click();
    });
  }

  getDownload(path, fileName, callbackFunc, setExtension = false) {
    axios({
      url: path,
      method: "GET",
      headers: { Authorization: localStorage.getItem("Authorization") },
      responseType: "blob", // Important
    })
      .then((response) => {
        // console.log(response.headers["content-disposition"].split("filename=")[1], "check here");
        console.log(response.data);
        if (response.data.type === "application/json") {
          callbackFunc(false, "Unable to download...");
        } else {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          if (setExtension) {
            link.setAttribute(
              "download",
              response.headers["content-disposition"].split("filename=")[1]
            ); //or any other extension
          } else {
            link.setAttribute("download", fileName); //or any other extension
          }
          // document.body.appendChild(link);
          link.click();

          // link.download = `${insurer}.xlsx`;
          // link.click();
          callbackFunc(true, "Downloaded the file successfully...");
        }
      })
      .catch((e) => {
        console.log(e, "errors");
        callbackFunc(false, "network error..");
      });
  }

  getFile(path, uuid, fileType, callbackFunc) {
    axios({
      url: `${path}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("Authorization") },
      responseType: "blob",
    })
      .then((response) => {
        if (response.data.type !== "application/octet-stream") {
          callbackFunc(false, "Unable to download...");
        } else {
          callbackFunc(true, "downloading...");
          const file = response?.headers?.["content-disposition"];
          const fileName = file.split("=")[1].split(".")[0];
          console.log(fileName, "****");
          const splitFile = file?.split(".");
          const fileFormat = splitFile
            ? splitFile?.[splitFile?.length - 1]
            : "";
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${fileName}.${fileFormat}`); //or any other extension
          // document.body.appendChild(link);
          link.click();
          callbackFunc(true, "File downloaded");
        }
      })
      .catch((err) => {
        callbackFunc(false, "Network error...");
      });
  }

  postUpload(url, data) {
    console.log(data, "Upload data");
    return this.service.request({
      method: "POST",
      url: url,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("Authorization"),
      },
    });
  }

  put(path, payload) {
    return this.service.request({
      method: "PUT",
      url: path,
      responseType: "json",
      data: payload,
      headers: { Authorization: localStorage.getItem("Authorization") },
    });
  }

  delete(path, payload) {
    return this.service.request({
      method: "DELETE",
      url: path,
      responseType: "json",
      data: payload,
      headers: { Authorization: localStorage.getItem("Authorization") },
    });
  }
}

export default new Service();
