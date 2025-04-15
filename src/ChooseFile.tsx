export function ChooseFile({
  onUploaded,
}: {
  onUploaded: (files: File[]) => void;
}) {
  return (
    <>
      <div className="text-white flex items-center justify-center mb-6">
        <div className="border-2 border-zinc-400/60 border-dashed hover:border-blue-400/50 bg-zinc-100/10 hover:bg-blue-300/20 rounded-2xl flex items-center justify-center w-full relative px-6 py-16 cursor-pointer">
          <input
            type="file"
            accept="image/heic,image/heif"
            className="absolute left-0 right-0 top-0 bottom-0 w-full opacity-0  cursor-pointer"
            title="upload"
            onChange={(e) => {
              if (e.target.files) {
                onUploaded(Array.from(e.target.files));
              }
            }}
          />
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl mb-2 text-zinc-100">Drag & Drop</h2>
            <div className="text-sm underline text-zinc-200/80">
              or choose heif/heic file.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
