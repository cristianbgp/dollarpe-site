// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

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

async function getData({ url, method = "GET", accesorToBuy, accesorToSell }) {
  const response = await fetch(url, {
    method: method,
  });
  const data = await response.json();
  return { buy: accesorToBuy(data), sell: accesorToSell(data) };
}

async function getAllData() {
  const dollar = {};
  [dollar.rextie, dollar.kambista, dollar.tkambio] = await Promise.all([
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
      url: "https://tkambio.com/wp-admin/admin-ajax.php?action=get_tipo_cambio",
      method: "POST",
      accesorToBuy: (data) => Number(data.sell_type_change),
      accesorToSell: (data) => Number(data.buy_type_change),
    }),
  ]);
  let result = Object.entries(dollar).sort(buyCriteriaDesc);
  return result;
}

export default async (req, res) => {
  const result = await getAllData();
  res.statusCode = 200;
  res.json(result);
};
