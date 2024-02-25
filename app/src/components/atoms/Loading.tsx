import React from "react";
import PokeBallLogo from "../../assets/PokeBallLogo";

const Loading = function () {
  return (
    <div className="animate-spin rounded-full h-32 w-32 flex items-center justify-center">
      <div className="flex items-center justify-center h-screen">
        <div className="rounded-full h-32 w-32">
          <PokeBallLogo />
        </div>
      </div>
    </div>
  );
};

export default Loading;
