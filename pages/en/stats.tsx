import MobileNav from "@/components/shared/MobileNav";
import { Navbar } from "@/components/shared/NavBar";
import Footer from "@/components/shared/footer";
import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaVideo, FaBook, FaRegClock, FaKey } from "react-icons/fa";
import { BsFiletypeKey } from "react-icons/bs";

interface ApiData {
  anime: number;
  manga: number;
  novels: number;
  skipTimes: number;
  apiKeys: number;
}

export default function Stats() {
  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [apiData2, setApiData2] = useState<{ key: number } | null>(null);

  useEffect(() => {
    fetch("https://api.anify.tv/stats")
      .then((response) => response.json())
      .then((data: ApiData) => setApiData(data))
      .catch((error) => console.error("Error fetching API data:", error));
  }, []);

  useEffect(() => {
    fetch("https://zoro.anify.tv/key/4")
      .then((response) => response.json())
      .then((data) => setApiData2(data))
      .catch((error) => console.error("Error fetching API data:", error));
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center text-white"
    >
      <Head>
        <title>Streamsora - Stats</title>
        <meta name="Stats" content="Stats" />
      </Head>
      <>
        <Navbar withNav={true} scrollP={5} shrink={true} />
        <MobileNav hideProfile={true} />
        <motion.div
          className="w-full max-w-screen-lg p-8 rounded-lg bg-secondary shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-6">Production Stats</h1>
          {apiData && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-[#ccc]">
              <div className="stat-box p-4 border border-gray-700 rounded-lg flex items-center">
                <FaVideo className="stat-icon mr-2 text-blue-500" />
                <p className="text-lg">Anime</p>
                <p className="text-2xl font-semibold ml-auto">{apiData.anime}</p>
              </div>
              <div className="stat-box p-4 border border-gray-700 rounded-lg flex items-center">
                <FaBook className="stat-icon mr-2 text-green-500" />
                <p className="text-lg">Manga</p>
                <p className="text-2xl font-semibold ml-auto">{apiData.manga}</p>
              </div>
              <div className="stat-box p-4 border border-gray-700 rounded-lg flex items-center">
                <FaBook className="stat-icon mr-2 text-red-500" />
                <p className="text-lg">Novels</p>
                <p className="text-2xl font-semibold ml-auto">{apiData.novels}</p>
              </div>
              <div className="stat-box p-4 border border-gray-700 rounded-lg flex items-center">
                <FaRegClock className="stat-icon mr-2 text-purple-500" />
                <p className="text-lg">Skip Times</p>
                <p className="text-2xl font-semibold ml-auto">{apiData.skipTimes}</p>
              </div>
              <div className="stat-box p-4 border border-gray-700 rounded-lg flex items-center">
                <FaKey className="stat-icon mr-2 text-orange-500" />
                <p className="text-lg">API Keys</p>
                <p className="text-2xl font-semibold ml-auto">{apiData.apiKeys}</p>
              </div>
              <div className="stat-box p-4 border border-gray-700 rounded-lg flex items-center">
                <BsFiletypeKey className="stat-icon mr-2 text-orange-500" />
                <p className="text-lg">Zoro Key</p>
                <p className="text-1x1 font-semibold ml-auto">{apiData2?.key}</p>
              </div>
            </div>
          )}
        </motion.div>
      </>
    </motion.div>
  );
}
