// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

function sortCriteriaGenerator(accessor, { asc = true, desc = false }) {
  return (a, b) => {
    const textA = accessor(a);
    const textB = accessor(b);
    if (typeof textA === "number")
      return asc && !desc ? textA - textB : textB - textA;
    return asc && !desc
      ? textA.localeCompare(textB)
      : textB.localeCompare(textA);
  };
}

const buyCriteriaDesc = sortCriteriaGenerator((item) => item[1].buy, {
  desc: true,
});

async function getData({
  url,
  method = "GET",
  headers,
  body,
  accesorToBuy,
  accesorToSell,
}) {
  const response = await fetch(url, {
    method,
    headers,
    body,
  });
  const data = await response.json();
  return { buy: accesorToBuy(data), sell: accesorToSell(data) };
}

async function getAllData() {
  const dollar = {};
  [
    dollar.rextie,
    dollar.kambista,
    dollar.tkambio,
    dollar.roblex,
  ] = await Promise.all([
    getData({
      url: "https://app.rextie.com/api/v1/fxrates/rate/",
      method: "POST",
      accesorToBuy: (data) => Number(data.fx_rate_buy),
      accesorToSell: (data) => Number(data.fx_rate_sell),
    }),
    getData({
      url:
        "https://api.kambista.com/v1/exchange/calculates?originCurrency=USD&destinationCurrency=PEN&active=S&amount=1",
      accesorToBuy: (data) => data.tc.bid,
      accesorToSell: (data) => data.tc.ask,
    }),
    getData({
      url: "https://tkambio.com/wp-admin/admin-ajax.php",
      method: "POST",
      body: "action=get_exchange_rate",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      accesorToBuy: (data) => Number(data.buying_rate),
      accesorToSell: (data) => Number(data.selling_rate),
    }),
    getData({
      url: "https://operations.roblex.pe/valuation/active-valuation",
      accesorToBuy: (data) => Number(data.amountBuy),
      accesorToSell: (data) => Number(data.amountSale),
    }),
  ]);
  let result = Object.entries(dollar).sort(buyCriteriaDesc);
  return result;
}

export default async (req, res) => {
  await cors(req, res);

  const result = await getAllData();
  res.statusCode = 200;
  res.json(result);
};
