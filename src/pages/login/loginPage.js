import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderComponent from "../../helpers/loader/loaderComponent";
import axios from "axios";

export default function LoginPage() {
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loader, setShowHideLoader] = useState(false);

  const formValidation = () => {
    let isValid = true;

    if (!userName) {
      toast.warn("Username is required");
      isValid = false;
    }
    if (!userPassword) {
      toast.warn("User password is required");
      isValid = false;
    }

    return isValid;
  };

  const submitUserLogin = async () => {
    try {
      // before submit we need to check validation
      if (formValidation()) {
        // we need to add a loading spinner to wait for the server response.
        // let's create a loader component
        setShowHideLoader(true);

        const headers = {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Headers": "Accept",
          // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          // "Access-Control-Allow-Headers":
          //   "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization",
          // Include your specific authorization token if required
          // Authorization: "Bearer YOUR_ACCESS_TOKEN",
          // Add any other headers specified by the API documentation
        };

        const queryParams = {
          username: userName,
          password: userPassword,
        };

        const response = await axios.post(
          "https://ravis-spring-boot-mobile-api.azuremicroservices.io/security/authenticateUser/?username=tradeshow@raviswholesale.com&password=ravis@11029",
          null
          // { headers: headers, params: queryParams }
        );

        if (response) {
          console.log(response.data);
          // here we need to store data as temp and navigate to the home page
          history.push({
            pathname: "/home",
            state: { userData: response.data },
          });
          // now we navigated to home but with static data.
          // let us go to the home page.
          // data will go to the home page as props.
        }
      }
    } catch (e) {
      // log error in case of an invalid user login user and password
      // we will use a toaster to show the error to the user
      toast.error(e.response?.data?.message || "An error occurred");
    } finally {
      setShowHideLoader(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-form">
        <div className="left-part" />
        <div className="right-part">
          <h3>Login Account</h3>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
          <div className="submit-action">
            <button className="submit-btn" onClick={submitUserLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
      {loader && <LoaderComponent />}
    </div>
  );
}
