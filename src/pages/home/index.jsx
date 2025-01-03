import React from "react";
import Header from '../../components/Header/header';
import Dashboard from "../../components/dashboard/Dashboard";

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
      <Header/>
      <Dashboard/>
    </>
  )
}
