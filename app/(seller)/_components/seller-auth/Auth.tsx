"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [active, setActive] = useState("login");

  return (
    <div className="flex justify-between">
      <div className="my-10 md:w-1/2 w-full mx-auto md:px-10 px-5">
        <Tabs value={active} onValueChange={setActive} className="w-full">
          <TabsList className="grid w-full grid-cols-2 py-3 px-6 font-prociono rounded-[5px] bg-[#27272a74]">
            <TabsTrigger
              value="login"
              className="text-black text-base font-bold px-4 py-2 cursor-pointer data-[state=active]:rounded-[10px] 
                     data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="text-black text-base font-bold px-4 py-2 cursor-pointer data-[state=active]:rounded-[10px] 
                     data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login setActive={setActive} />
          </TabsContent>
          <TabsContent value="register">
            <Register setActive={setActive} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
