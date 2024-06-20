import { useState } from "react";
import KhodamImg from "./assets/bg.jpeg";
import { FaShareAlt } from "react-icons/fa";
import { Khodam } from "./ListKhodam";

const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Cek Website Ini",
        text: "Ayo Cek Apakah Ada Khodam Dalam diri anda !",
        url: window.location.href,
      });
      console.log("Share berhasil!");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  } else {
    alert("Web Share API tidak didukung di browser anda.");
  }
};

const App = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const randomIndex = Math.floor(Math.random() * Khodam.length);
      const khodamResult =
        Math.random() < 0.3
          ? "Anda Tidak memiliki Khodam pada diri anda."
          : Khodam[randomIndex].isian;
      setResult({ name, khodamResult });
    }, 3000);
  };

  const handleRetry = () => {
    setName("");
    setResult(null);
  };

  return (
    <main
      className="flex relative items-center justify-center h-screen w-full"
      style={{
        backgroundImage: `url(${KhodamImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute h-full w-full rounded-md flex px-3 flex-col items-center justify-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-slate-200 flex relative justify-center items-center rounded-md w-96 h-96 md:w-[44rem] "
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          }}
        >
          <div
            className="flex flex-col justify-center items-center"
            style={{ opacity: 1 }}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-20 w-20 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              </div>
            ) : result ? (
              <div className="text-center text-xl">
                <h1 className="font-bold text-gray-800 text-2xl md:text-3xl mb-3">
                  Hasil Khodam
                </h1>
                <p className="uppercase font-bold ">{result.name}</p>
                <p>Khodam anda adalah:</p>
                <p className="font-bold text-gray-800">{result.khodamResult}</p>
                <button
                  onClick={handleRetry}
                  className="bg-red-500 w-20 h-10 rounded-md text-sm text-white mt-5"
                >
                  Ulangi
                </button>
              </div>
            ) : (
              <>
                <h1 className="font-bold text-gray-800 text-2xl md:text-3xl mb-3">
                  Cek Khodam Anda Disini
                </h1>
                <label className="font-semibold text-xl text-gray-800 mb-3">
                  Masukan Nama Anda...
                </label>
                <div className="flex gap-2 items-center justify-center">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 rounded-md my-3"
                    placeholder="Masukan Nama Anda"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-red-500  font-semibold w-20 h-10 rounded-md text-sm text-white"
                  >
                    Submit
                  </button>
                </div>
                <h1 className="text-lg text-center mt-3">
                  Jangan lupa share ke teman teman anda untuk mengecek apakah
                  ada khodam dalam diri nya
                </h1>
                <button
                  onClick={handleShare}
                  className="flex items-center absolute top-2 left-2 justify-center p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 dark:bg-slate-400"
                >
                  <FaShareAlt />
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default App;
