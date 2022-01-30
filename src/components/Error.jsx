import { useState, useEffect } from "react";

const Error = () => {
  const [msg] = useState([
    "¯_(ツ)_/¯",
    ":-(",
    "(•_•)",
    "(⊙_⊙)",

    "(^///^)",
    "🕳",
    "X_X",
    ":/",
    "^3^",
    "~_~",
    ";[",
    "+_+",
    "¬_¬",
    "^_+",
    ">.<",
    "-_-",
    "^_-",
    "Y.Y",
    "=(",
  ]);
  const [index, setindex] = useState(0);

  useEffect(() => {
    setindex(Math.floor(Math.random() * (msg.length + 1)));
    console.log(msg[index]);
  }, [msg]);
  return (
    <main className="h-screen  min-h-screen container md:max-w-screen-2xl w-5/6 mx-auto overflow-scroll py-4 text-gray-800">

      <h1 className="font-bold text-2xl ">
        <img src="https://img.icons8.com/pastel-glyph/64/000000/warning-triangle.png" />
        sideEffects
      </h1>
      <div className="flex flex-col h-screen text-xs items-center justify-center text-black text-opacity-80 -mt-20">
        <p className="text-7xl p-4 ">{msg[index] || "(⊙_⊙)"}</p>
        <span className="">page not found yet...</span>
      </div>
    </main>
  );
};

export default Error;
