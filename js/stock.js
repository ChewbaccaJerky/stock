
import Sunburst from './charts/sunburst';
import Bar from './charts/bar';
import * as yahooApiUtil from './util/yahoo_api_util';
import STOCK_DATA from './data';


Sunburst(STOCK_DATA);

// yahooApiUtil.fetchStockQuotes().then((res)=> {
//   let barInfo = parseForBar(res.query.results.quote);
//   Bar(barInfo);
// });
//
// const parseForBar = (quotes) => {
//   let barInfo = [];
//   let temp = {};
//   for(let i in quotes) {
//     temp = {"name": quotes[i].symbol, "value": parseInt(quotes[i].Ask)};
//     barInfo.push(temp);
//   }
// };
