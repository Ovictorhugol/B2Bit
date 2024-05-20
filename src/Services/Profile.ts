import { AxiosResponse } from "axios";
import { Api } from "../Providers";

const profileUser = async (token: string | null) => {
  Api.interceptors.request.use(
    (request) => {
      request.headers.Accept = "application/json;version=v1_web";
      request.headers["Content-Type"] = "application/json";
      return request;
    },

    function (error) {
      return Promise.reject(error);
    }
  );

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await Api.get(
    "https://api.homologation.cliqdrive.com.br/auth/profile/",
    axiosConfig
  )
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const ProfileService = {
  profileUser,
};
