import Terminal from "@/components/Terminal";
import Head from "next/head";
import TypewriterComponent from "typewriter-effect";

export default function Home() {
  return (
    <div className="bg-gray-100 flex justify-center flex-col min-h-screen font-mono">
      <Head>
        <title>dollarpe</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💸</text></svg>"
        />
      </Head>
      <header className="flex justify-center items-center px-8 py-12">
        <h1 className="text-4xl md:text-6xl">
          <TypewriterComponent
            onInit={(typewriter) => {
              typewriter.typeString("dollarpe").start();
            }}
          />
        </h1>
      </header>
      <Terminal />
      <div className="flex justify-center items-center flex-col space-x-0 space-y-2 md:flex-row md:space-x-2 md:space-y-0 mb-8">
        <a
          href="https://github.com/cristianbgp/dollarpe"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2A2B2F] hover:bg-[#585a60] text-white transition-colors rounded-md px-3 py-2"
        >
          CLI
        </a>
        <a
          href="https://github.com/cristianbgp/electron-dollarpe"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2A2B2F] hover:bg-[#585a60] text-white transition-colors rounded-md px-3 py-2"
        >
          Mac app
        </a>
        <a
          href="/api"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2A2B2F] hover:bg-[#585a60] text-white transition-colors rounded-md px-3 py-2"
        >
          API endpoint
        </a>
      </div>
      <footer className="flex justify-center items-center pb-4">
        <a
          href="https://github.com/cristianbgp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by @cristianbgp
        </a>
      </footer>
    </div>
  );
}
