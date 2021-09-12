import { useEffect, useState } from "react";

const dots = {
  interval: 80,
  frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
};

export default function Fallback() {
  const [loader, setLoader] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoader((prevLoader) =>
        dots.frames.length - 1 === prevLoader ? 0 : prevLoader + 1
      );
    }, dots.interval);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <span className="font-mono">{dots.frames[loader]} Loading...</span>;
}
