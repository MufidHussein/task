"use client";
import React, { useState } from "react";

import { Snackbar } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import SignIn from "./components/SginIn";
import ApiCalls from "@@/api/ApiCalls";

const SignInPage = () => {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (body: any) => {
    setIsLoading(true);
    ApiCalls.callSignIn(
      body,
      (onData: any) => {
        const data = onData.data;
        const token = data.accessToken;
        Cookies.set("token", token, { expires: 1 });
        setIsLoading(false);
        router.replace("restaurants");
      },
      () => {
        setShowMessage(true);
        setIsLoading(false);
      }
    );
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        key="sncakbar"
        autoHideDuration={3000}
        open={showMessage}
        onClose={() => {
          setShowMessage(false);
        }}
        message="Wrong Credential"
      />
      <SignIn onSubmit={onSubmit} isLoading={isLoading} />
    </>
  );
};
export default SignInPage;
