const main = require("./worker-pool");
const cheerio = require('cheerio');
const Piscina = require('piscina')
path = require('path');

var number_workers;
var host;
var parentUrl;



exports.mainFunc = async ({ result, workers, url } = {}) => {
  if (workers) number_workers = workers;
  let arr = [];
  let dataArr = []
  if (url) {
    let domain = (new URL(url));
    parentUrl = domain;
    domain = domain.hostname;
    host = domain
    // call worker with url to craw and get page data
    let res = await main(url);
    // send data to this function to extract urls from a tags
    return fetchData(res);
  }
  return fetchData(dataArr);
}

async function fetchData(res) {
  let arr = [];
  for (let i = 0; i < res.length; i += 1) {
    if (!res[i]) {
      console.log("Invalid data Oj");
    }
    const html = res[i];
    const $ = cheerio.load(html);
    const dataObj = $('a');
    
    dataObj.each(function () {
      let tag = $(this).attr('href'); // get the url in all the a elements
      if (!tag) {
        console.log('No link found')
      }
      var pat = /^https?:\/\//i;
      if (!pat.test(tag) && tag != undefined) {
        //add hostname to relative urls
        tag = `http://${host}${tag}`
      }
      if (tag != undefined && tag) {
        let tagDomain = (new URL(tag));
        tagHostName = tagDomain.hostname;
        // verify hostname
        if (tagHostName === host) arr.push(tag);
      }
    });
    if (arr.length < 1) {
      console.log('No more links!')
    }
    // split arr of urls into chunks
    function chunkArray(arr, n) {
      var chunkLength = Math.max(arr.length / n, 1);
      var chunks = [];
      for (var i = 0; i < n; i++) {
        if (chunkLength * (i + 1) <= arr.length) chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)));
      }
      return chunks;
    }
    let toProcess = {}
    if (number_workers) {
      let chunks = chunkArray(arr, number_workers)
      let count = 0
      // construct object to hold chucks
      for (let i = 0; i < chunks.length; i += 1) {
        toProcess[count] = chunks[i]
        count++
      }
    } else {
      toProcess[0] = arr
    }

    const piscina = new Piscina({
      filename: path.resolve(__dirname, 'worker-pool.js')
    });
    //call worker thread with pool of chunks
    const result = await piscina.run(toProcess).catch((err) => console.log(err));
    if (result) {
      return fetchData(result)
    }
    if (!result) {
      console.log('No more links!')
    }
  }
};



