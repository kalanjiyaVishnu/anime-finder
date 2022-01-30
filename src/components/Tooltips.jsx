// import React, { useRef } from "react";
// import Button from "@material-tailwind/react/Button";
// import Tooltips from "@material-tailwind/react/Tooltips";
// import TooltipsContents from "@material-tailwind/react/TooltipsContent";

// export default function TooltipsComp({ dir = "left" }) {
//   const buttonRef = useRef();

//   return (
//     <>
//       <Button color="lightBlue" ref={buttonRef} ripple={dir}>
//         Tooltip bottom
//       </Button>

//       <Tooltips placement="bottom" ref={buttonRef}>
//         <TooltipContents>Tooltip bottom</TooltipContents>
//       </Tooltips>
//     </>
//   );
// }

export default ({ content ,children ,move}) => {

  return (
    <div class="relative flex flex-col items-center group z-50">
      {children}
      <div class="absolute bottom-0  -left-5 flex-col items-center hidden mb-6 group-hover:flex">
        <span class="relative z-10 py-2 text-center whitespace-nowrap px-4 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg text-white-light">
          {content}
        </span>
        <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
      </div>
    </div>
  );
};
