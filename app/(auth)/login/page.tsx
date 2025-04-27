"use client";

import TextInput from "@/app/components/ui/common/TextInput";
import CustomButton from "@/app/components/ui/common/Button";
import Card from "@/app/components/ui/common/Card";
import Logo from "@/app/components/ui/common/Logo";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "@/app/utils/validation";
import { useState } from "react";
import { useLoginMutation } from "@/store/thunks/authThunk";
import { SerializedError } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
// import { ClipLoader } from 'react-spinners';
// import CustomButton from "@/app/components/ui/common/Button";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [login, { error, isLoading }] = useLoginMutation();
  const [customErrorMessage, setCustomErrorMessage] = useState("");

  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log("Logging in:", data);

    try {
      setCustomErrorMessage("");
      const response = await login({
        email: data?.email,
        password: data?.password,
        provider: "Manual",
        fcmToken: ""
      }).unwrap();

      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   credentials: "include",
      //   body: JSON.stringify(
      //     {
      //       email: data?.email,
      //       password: data?.password,
      //       provider: "Manual",
      //     }
      //   ),
      // });

      if (response?.status === 200) {
        // Cookies.set("accessToken", response?.token, { expires: 7, path: '/' });
        router.push("/dashboard");
        setLoading(false);
        // localStorage.setItem("accessToken", response?.token);

        reset();
      }
    } catch (err: SerializedError | any) {
      if (err?.data?.message) {
        setCustomErrorMessage(err?.data?.message);
        reset();
      }
      setLoading(false);
      // localStorage.setItem("accessToken",response?.token);
      reset()
    }
  };



return (
  <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-none">
    <div
      className="hidden md:flex items-center justify-center  min-h-screen"
      style={{
        backgroundImage: "url(/svg/gradient-bg.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Logo />
    </div>

    <div className="flex items-center justify-center w-full  bg-white">
      <div className="bg-white  rounded-lg p-10  w-80 lg:w-96 border border-[#B098E5]">
        <h2
          className="font-[600] font-poppins  text-[30px] text-black text-center mb-4">
          Log in
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 font-[400]  font-poppins text-[18px] text-black"
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  variant="filled"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 font-[400]  text-[18px] text-black"
            >
              Password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  variant="filled"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </div>

          {customErrorMessage ? (
            <p className="text-red-600 text-[12px] text-center">{customErrorMessage}</p>
          ) : (
            <></>
          )}

          <CustomButton loading={isLoading} disabled={loading ? true : false}>
            {"Log In"}
          </CustomButton>
        </form>
      </div>
    </div>
  </div>
);

 
};

export default LoginPage;
