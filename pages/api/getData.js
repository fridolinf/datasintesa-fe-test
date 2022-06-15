import axios from "axios";
import api from "../utils/baseUrl";
import { Header } from "../utils/Headers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const getListUsers = async (page, count, nat) => {
  try {
    const data = await axios.get(
      `${api.BASE_URL}?page=${page}&results=${count}&nat=${nat}`,
      Header()
    );
    if (data.status === 200) {
      return {
        status: data.status,
        data: data.data.results,
        info: data.info,
        success: true,
      };
    } else {
      return {
        status: data.status,
        info: {},
        data: [],
        success: true,
      };
    }
  } catch (err) {
    return {
      success: false,
      status: 404,
      data: [
        {
          err,
        },
      ],
    };
  }
};

// const getListUsers = async (page, count) => {
//   try {
//     const resp = await axios.get(
//       `${api.BASE_URL}+${api.ENDPOINT} + ?page=${page} + ?results=${count}`
//     );
//     return resp;
//   } catch (err) {
//     return err;
//   }
// };

export default getListUsers;
