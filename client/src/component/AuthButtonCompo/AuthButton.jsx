  import React from "react";
  import "./AuthButton.css"
  import {GoogleAuthProvider, GithubAuthProvider, signInWithRedirect} from "firebase/auth"
  import {auth} from "../../firebase"

  const AuthButton = ({ Icon, label, provider }) => {

    const googleAuthProvider = new GoogleAuthProvider
    const githubAuthProvider = new GithubAuthProvider 

    const handleAuthClick = async() => {
      switch(provider){
        case "GoogleAuthProvider":
          console.log("Google Auth")
          await signInWithRedirect(auth, googleAuthProvider).then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log("Error", err.message)
          })
          break
        case "GithubAuthProvider":
          console.log("Github Auth")
          await signInWithRedirect(auth, githubAuthProvider).then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log("Error", err.message)
          })
          break

        default:
          console.log("Googel Auth")
          await signInWithRedirect(auth, googleAuthProvider).then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log("Error", err.message)
          })
          break
      }
    }

    return (
      <>
        <div onClick={handleAuthClick} className="auth-btn-div">
          <Icon />
          <p>{label}</p>
        </div>
      </>
    );
  };

  export default AuthButton;
