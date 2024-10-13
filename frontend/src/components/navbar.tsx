import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@propelauth/nextjs/client";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // Call the API to add the user to MongoDB
      fetch("/api/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.userId, email: user.email }),
      }).catch((err) => console.error("Error adding user:", err));
    }
  }, [user]);

  return (
    <div className="bg-white shadow-lg text-black p-4">
      <div className="container mx-auto flex text-lg items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img src="/Logo.png" alt="PronounFix" className="w-6 h-10" />
          <h1 className="text-xl text-primary font-bold">Fluently</h1>
        </motion.div>
        <div className="flex gap-12 items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push("/conversate")}
            className="hover:border-primary hover:border-2 rounded-2xl py-1 font-bold px-5 hover:text-primary cursor-pointer"
          >
            Conversate
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push("/training")}
            className="hover:border-primary hover:border-2 rounded-2xl py-1 font-bold px-5 hover:text-primary cursor-pointer"
          >
            Training
          </motion.div>

          {user ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                router.push("https://9241944581.propelauthtest.com/account")
              }
              className="hover:border-primary hover:border-2 rounded-2xl py-1 font-bold px-5 hover:text-primary cursor-pointer"
            >
              Profile
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                router.push("https://9241944581.propelauthtest.com")
              }
              className="hover:border-primary hover:border-2 rounded-2xl py-1 font-bold px-5 hover:text-primary cursor-pointer"
            >
              Login
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
