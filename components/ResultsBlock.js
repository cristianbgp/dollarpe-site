import useSWR from "swr";
import fetcher from "utils/fetcher";
import Fallback from "./Fallback";

export default function ResultsBlock() {
  const { data, error } = useSWR("/api", fetcher);

  if (error) {
    return (
      <span className="flex flex-col ml-3 text-red-500">
        <span>Something went wrong 🚨</span>
        <span>Try again later</span>
      </span>
    );
  }

  return (
    <p className="flex flex-col ml-3">
      {!data ? (
        <Fallback />
      ) : (
        data.map(([name, { buy, sell, pageUrl }], index) => (
          <span key={name} className="flex flex-col">
            <span>
              <a
                href={pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 border-b border-red-400 border-dashed"
              >
                {name}
              </a>
            </span>
            <span className={index === 0 ? "text-green-400" : ""}>
              <span className="text-blue-400">buy: </span>
              {buy}
            </span>
            <span className={index === 0 ? "text-green-400" : ""}>
              <span className="text-blue-400">sell: </span>
              {sell}
            </span>
          </span>
        ))
      )}
    </p>
  );
}
