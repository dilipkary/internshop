var express = require('express');
var router = express.Router();

const puppeteer = require('puppeteer'); // Adding Puppeteer

/* GET home page. */
router.get('/', function(req, res, next) {
  /**/
  res.render('test', { title: 'Express',data:[]});
});
router.get('/result',function (req,res,next) {
  var search = req.body.search_web;
  console.log(search);
  puppeteer.launch().then(async function (browser) {
    const page = await browser.newPage();
    await page.goto('http://digidb.io/digimon-list/');

    // Targeting the DOM Nodes that contain the Digimon names
    const digimonNames = await page.$$eval('#digiList tbody tr td:nth-child(2) a', function (digimons) {
      // Mapping each Digimon name to an array
      return digimons.map(function (digimon) {
        return digimon.innerText;
      });
    });

    // Closing the Puppeteer controlled headless browser
    await browser.close();
    console.log(digimonNames);
    // Sending the Digimon names to Postman
    res.send();
  });
  //res.send( {search_item:search})
});


router.post('/', function(req, res){

  // input value from search
  var search = req.body.search_web;
  console.log(search);
  const SEARCH_URL ='https://www.flipkart.com/search?q='+search;//(movie_id) => `www.amazon.in/s?k=${movie_id}/`;

  if(search){(async () => {
    /* Initiate the Puppeteer browser */
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    /* Go to the IMDB Movie page and wait for it to load */
    await page.goto(SEARCH_URL);

    /* Run javascript inside of the page */
    let data = await page.evaluate(() => {
      document
      let image_link = Array.from(document.querySelectorAll('._3togXc')).
      map(partner=> partner.getAttribute('src').split('?')[0]);
      let brand_name=Array.from(document.querySelectorAll('._2B_pmu')).
      map(partner=> partner.innerText.trim());
      let price= Array.from(document.querySelectorAll('._1vC4OE')).
      map(partner=> partner.innerText.trim());
      let desc= Array.from(document.querySelectorAll('._2mylT6')).
      map(partner=> partner.innerText.trim());
      let dt=image_link.map((val,i)=>{
        ds={image_link:val,brand_name:brand_name[i],price:price[i],desc:desc[i]};
        return ds;
      });
      /* Returning an object filled with the scraped data */
      return dt;

    });

    /* Outputting what we scraped */
    console.log(data);
    await browser.close();
    res.render('test',{data:data,title:"hello"});
  })();}

});
module.exports = router;
