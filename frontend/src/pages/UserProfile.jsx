import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
import Button from "../components/Button";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const UserProfile = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-6 text-center">
          {/* <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage src="https://via.placeholder.com/150" alt="User Avatar" />
          </Avatar> */}
          <h2 className="text-2xl font-bold text-gray-800 mt-4">John Doe</h2>
          <p className="text-gray-500">@johndoe</p>
          <p className="mt-2 text-gray-600">Passionate about plants and nature. Sharing my gardening journey with the world!</p>
          <div className="mt-4 flex justify-center gap-4">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md">Follow</Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">Message</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;
