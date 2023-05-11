import API from "constants/api";

const GetUserDataObject = async (user) => {
 
  const response = await fetch(
    ``,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    let res = await response.json();
    const user = res.GetUserDataObjectResult;
    return user;
  } else {
    throw "Fetching user profile failed";
  }
};

export default GetUserDataObject;
