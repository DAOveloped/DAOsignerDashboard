import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Balances from "./Balances";
import ChainSelector from "./ChainSelector";

const colors = [
  "#F44336",
  "#673AB7",
  "#03A9F4",
  "#4CAF50",
  "#FFEB3B",
  "#FF5722",
  "#607D8B",
  "#E91E63",
  "#3F51B5",
  "#00BCD4",
  "#8BC34A",
  "#FFC107",
  "#795548",
  "#9C27B0",
  "#2196F3",
  "#009688",
  "#CDDC39",
  "#FF9800",
  "#9E9E9E",
  "#EF9A9A",
  "#B39DDB",
  "#81D4FA",
  "#A5D6A7",
  "#FFF59D",
  "#FFAB91",
  "#B0BEC5",
  "#F48FB1",
  "#9FA8DA",
  "#80DEEA",
  "#C5E1A5",
  "#FFE082",
  "#BCAAA4",
  "#CE93D8",
  "#90CAF9",
  "#80CBC4",
  "#E6EE9C",
  "#FFCC80",
  "#EEEEEE",
  "#B71C1C",
  "#311B92",
  "#01579B",
  "#1B5E20",
  "#F57F17",
  "#BF360C",
  "#263238",
  "#880E4F",
  "#1A237E",
  "#006064",
  "#33691E",
  "#FF6F00",
  "#3E2723",
  "#4A148C",
  "#0D47A1",
  "#004D40",
  "#827717",
  "#E65100",
  "#212121",
];

function Portfolio() {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chainId, setChainId] = useState(250);
  const [publicKey] = useState("0xD156382c8B7CF309865c7ACAc5Caea323f8C30A4");
  const [apiKey, setApiKey] = useState("");
  const [balances, setBalances] = useState([]); // State to hold token balances
  const [selectedChain, setSelectedChain] = useState(); // State to hold selected blockchain
  const [chains, setChains] = useState([]);

  // Function to handle blockchain selection
  const handleChainSelect = (chainId) => {
    setSelectedChain(chainId);
  };

  useEffect(() => {
    setApiKey(import.meta.env.VITE_API_KEY);
    if (publicKey && chainId) {
      setLoading(true);

      const historicPortfolioValueEndpoint = `https://api.covalenthq.com/v1/${chainId}/address/${publicKey}/portfolio_v2/?days=365`;

      // Fetching historic portfolio value
      fetch(historicPortfolioValueEndpoint, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(apiKey + ":")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const rawData = res.data.items;
          const transformedData = transformForRecharts(rawData);
          const dataKeys = rawData.map((item) => item.contract_ticker_symbol);
          setKeys(dataKeys);
          setData(transformedData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching portfolio data:", error);
          setLoading(false);
        });
    }
  }, [publicKey, chainId, apiKey]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-container mt-20">
      <div className="paragraph-container mt-10">
        <p
          style={{
            color: "var(--header-color)",
            fontSize: "1.7rem",
            maxWidth: "800px",
            marginBottom: "20px",
          }}
        >
          This is the value of the DAO&apos;s Treasury over the past year.
          Contributions to Crypto Policy DAO will be displayed here and will be
          allocated to the DAO members for their contributions.
        </p>
      </div>
      <ChainSelector chainId={chains} handleChainSelect={handleChainSelect} />
      <Balances />
      <div className="chart-container mb-40">
        <LineChart
          width={1200}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tick={{ fill: "var(--description-color)", fontSize: ".9em" }}
          />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            tick={{ fill: "var(--header-color)", fontSize: "1.2em" }}
          />
          <Tooltip formatter={(value) => `$${parseFloat(value).toFixed(2)}`} />
          <Legend tick={{ fontSize: "1.6em" }} />
          {keys.map((item, i) => {
            return (
              <Line
                key={i}
                dataKey={item}
                type="monotone"
                stroke={colors[i]}
                dot={false} // Remove dots marking each data point
                strokeWidth={3.2} // Set the line thickness
              />
            );
          })}
        </LineChart>
      </div>
    </div>
  );
}

export default Portfolio;

const transformForRecharts = (rawData) => {
  const transformedData = rawData.reduce((acc, curr) => {
    const singleTokenTimeSeries = curr.holdings.map((holdingsItem) => {
      // Formatting the date string just a little...
      const dateStr = holdingsItem.timestamp.slice(0, 10);
      const date = new Date(dateStr);
      const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      const formattedDate = date.toLocaleDateString("en-US", options);
      return {
        timestamp: formattedDate,
        [curr.contract_ticker_symbol]: holdingsItem.close.quote,
      };
    });
    const newArr = singleTokenTimeSeries.map((item, i) =>
      Object.assign(item, acc[i])
    );
    return newArr;
  }, []);

  return transformedData;
};
