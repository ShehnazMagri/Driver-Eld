import { getloginuserAction } from "../../Redux/Action/adminauth";

const getLoginUser = () => async (dispatch) => {
  try {
    const response = await dispatch(getloginuserAction());
    return response;
  } catch (error) {
    console.error("Error in getLoginUser:", error);
    throw error;
  }
};

export default getLoginUser;
