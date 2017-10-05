
import Sunburst from './charts/sunburst';
import LineGraph from './charts/line_graph';
import * as yahooApiUtil from './util/yahoo_api_util';
import {fetchStockQuote} from './util/alphaUtilAPI';
import STOCK_DATA from './data';


Sunburst(STOCK_DATA);
const STOCK_SYMS = ["AAPL", "GOOGL", "SQ", "TSLA", "VMW"];
let temp = "";
let i = 0
let stopVar = setInterval(function(){
  makeLineGraph(STOCK_SYMS[0]);
  temp = STOCK_SYMS.shift();
  STOCK_SYMS.push(temp);
  i++;
  // if(i === 10) {
  //   console.log("STOPPP!!!!");
  //   clearInterval(stopVar);
  // }
}, 3000);





window.fetchStockQuote = fetchStockQuote;

function makeLineGraph(symbol){
  fetchStockQuote(symbol).then(res => {
    let stockInfo = res["Monthly Time Series"];
    let parseArray = Object.keys(stockInfo).map(key => {

      return {
        "date": key,
        "open": stockInfo[key]["1. open"],
        "high": stockInfo[key]["2. high"],
        "low": stockInfo[key]["3. low"],
        "close": stockInfo[key]["4. close"]
      }
    });
    LineGraph({[symbol]: parseArray});
  });
}
