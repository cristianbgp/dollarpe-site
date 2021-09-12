import { useState } from "react";
import TypewriterComponent from "typewriter-effect";
import ResultsBlock from "./ResultsBlock";

export default function Terminal() {
  const [showResultBlock, setShowResultBlock] = useState(false);

  return (
    <main className="p-8 flex justify-center items-center">
      <div className="flex flex-col bg-[#2A2B2F] min-h-[420px] max-w-[800px] w-full p-2 rounded-lg">
        <div className="flex space-x-2">
          <div className="rounded-full w-4 h-4 bg-[#FF5F56]" />
          <div className="rounded-full w-4 h-4 bg-[#FDBB2C]" />
          <div className="rounded-full w-4 h-4 bg-[#27C840]" />
        </div>
        <div className="h-full py-2 text-white">
          <div className="flex">
            <span className="text-[#5AF78F] mr-1">→</span>
            <TypewriterComponent
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(1500)
                  .typeString("dollarpe")
                  .callFunction(() => {
                    setShowResultBlock(true);
                  })
                  .start();
              }}
            />
          </div>
          {showResultBlock && <ResultsBlock />}
        </div>
      </div>
    </main>
  );
}
