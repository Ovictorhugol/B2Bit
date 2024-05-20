import { Api } from "../Providers";
import { ResponseInterface } from "../Interfaces/ResponseInterface";
import { UserInterface } from "../Interfaces/";
import { AxiosResponse } from "axios";

// const axiosConfig = {
//   headers: {
//     "Content-Type": "application/json",
//     // Accept: "application/json;version=v1_web",
//   },
// };
const loginUser = async (data: UserInterface): Promise<ResponseInterface> => {
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

  return await Api.post(
    "https://api.homologation.cliqdrive.com.br/auth/login/",
    data
  )
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const LoginServices = {
  loginUser,
};
