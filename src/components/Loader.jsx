export const Loader = () => (
  <div className="h-screen w-screen absolute top-24 left-0 bottom-0 right-0 bg-black -z-10 bg-opacity-30 text-center text-black flex items-center justify-center">
    <span
      className="border-4 border-l-cgray-900 shadow-sm border-opacity-30
   border-white-dull rounded-full p-4 animate-spin"
    ></span>
  </div>
);
export const LoaderNew = () => (
  <div
    className="h-screen  bg-gray-300 absolute top-16 left-0 bottom-0 right-0 w-screen items-center justify-center flex
space-x-2"
  >
    <span>loading</span>
    <span className="flex h-3 w-3 z-50  relative">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-800 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-800"></span>
    </span>
  </div>
);
