"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import React, { useState } from "react";
import EditProfile from "./EditProfile";
import Profile from "./Profile";

const SellerProfile = () => {
  const [active, setActive] = useState("profile");
  return (
    <div>
      <div className="flex justify-between">
        <div className="md:my-10 my-4 md:w-[85%] w-full mx-auto md:px-10 px-2">
          <Tabs value={active} onValueChange={setActive} className="w-full">
            <TabsList className="grid w-full grid-cols-2 py-3 px-6 font-prociono rounded-[5px] bg-[#27272a74]">
              <TabsTrigger
                value="profile"
                className="text-black text-base font-bold px-4 py-2 cursor-pointer data-[state=active]:rounded-[10px] 
                     data-[state=active]:bg-black data-[state=active]:text-white"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="edit-profile"
                className="text-black text-base font-bold px-4 py-2 cursor-pointer data-[state=active]:rounded-[10px] 
                     data-[state=active]:bg-black data-[state=active]:text-white"
              >
                Edit Profile
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Profile />
            </TabsContent>
            <TabsContent value="edit-profile">
              <EditProfile setActive={setActive} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
