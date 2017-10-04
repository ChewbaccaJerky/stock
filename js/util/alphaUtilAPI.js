import $ from 'jquery';

let testQuery = "select%20*%20from%20pm.finance%20where%20symbol%3D%22YHOO%22";

const fetchEquities = () => ({
  $.ajax({
    method: "GET",
    url: "https://query.yahooapis.com/v1/public/yql?"
    data: {
      q: testQuery,
      format: 'json',
      diagnostics: 'true',
      

    }
  })
});

const fetchEquity = (name) => ({

});
