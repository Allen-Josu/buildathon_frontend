import GoogleLogin, { GoogleLogout } from "react-google-login"

const clientId = "1067183531624-6fdo6qjmu4h748peb0asftdbk2ecvkit.apps.googleusercontent.com"


export default function Home() {
  const onSuccess = (response) => {
    console.log('Login Success:', response.profileObj);
  };

  const onFailure = (response) => {
    console.log('Login Failed:', response);
  };

  const onLogoutSuccess = () => {
    console.log('Logout Successful');
  };
  return (
    <>
    <p>my Home</p>
  
    </>
  )
}
