import { useState } from "react";
import { ChooseFile } from "./ChooseFile";
import convert from "heic-convert/browser";

function App() {
  const [chooseFiles, setChooseFiles] = useState<File[]>([]);
  const [showImage, setShowImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  async function handleUpload(files: File[]) {
    setLoading(true);
    setChooseFiles([]);
    setChooseFiles(files);
    const file = files[0];
    const buffer = new Uint8Array(await file.arrayBuffer());
    const outputBuffer = await convert({
      buffer: buffer, // the HEIC file buffer
      format: "JPEG", // output format
      quality: 1, // the jpeg compression quality, between 0 and 1
    });

    // 显示到页面上
    const blob = new Blob([outputBuffer], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);
    setShowImage(url);
    setLoading(false);
  }

  async function handleDownload(format: "JPEG" | "PNG") {
    setDownloadLoading(true);
    const file = chooseFiles[0];
    const buffer = new Uint8Array(await file.arrayBuffer());
    const outputBuffer = await convert({
      buffer: buffer, // the HEIC file buffer
      format: format, // output format
      quality: 1, // the jpeg compression quality, between 0 and 1
    });
    const blob = new Blob([outputBuffer], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `download.${format.toLowerCase()}`;
    link.click();
    setDownloadLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto h-full relative">
      <h1 className="text-3xl font-bold text-zinc-50 mb-6 my-4 text-center">
        HEIC to JPG/PNG Converter
      </h1>
      <ChooseFile onUploaded={(files) => handleUpload(files)} />
      <div>Note: Your images will not be uploaded to the server; the entire process will take place within the browser.</div>
      {chooseFiles.length > 0 && (
        <div className="text-zinc-50">
          <div className="flex justify-center gap-4 mb-4">
            <button
              type="button"
              className="bg-zinc-600 outline-zinc-500 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500 outline outline-offset-2 hover:outline-blue-500"
              onClick={() => handleDownload("JPEG")}
              disabled={downloadLoading}
            >
              Download JPG
            </button>
            <button
              type="button"
              className="bg-zinc-600 outline-zinc-500 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500 outline outline-offset-2 hover:outline-blue-500"
              onClick={() => handleDownload("PNG")}
              disabled={downloadLoading}
            >
              Download PNG
            </button>
          </div>
          {loading ? (
            <div className="w-full h-[200px] bg-zinc-200/40  rounded-md flex items-center justify-center gap-2 transition-all">
              <span className="mr-4">Converting...</span>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-loader-circle-icon lucide-loader-circle animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="w-full mx-auto  transition-all">
              <img className="w-full rounded-md" src={showImage} alt="" />
            </div>
          )}
        </div>
      )}

      <footer className="text-zinc-50 flex items-center justify-center gap-2 mt-4 absolute left-0 right-0 bottom-0">
        <div className="text-left text-md text-zinc-400">© 2024 | All rights reserved</div>
        <div className="flex items-center justify-start gap-2 text-zinc-300">
          <a className="text-md" href="https://blog.ximei.me">BLOG</a>
          <a className="text-md" href="https://tinypng.ximei.me">TinyPNG</a>
          <a className="text-md" href="https://snaptune.ximei.me">snaptune</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
