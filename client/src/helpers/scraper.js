import axios from "axios";
import cheerio from "cheerio";


export default function scraper() {


       axios.get("https://cors-anywhere.herokuapp.com/https://www.onegreenplanet.org/channel/environment/").then(function(response) {
           const $ = cheerio.load(response.data);

           const result = {};

           $(".feature-block").each(function (i, element) {
              

               result.title= $(this)
               .children(".feature-text a")
               .attr("title").trim();
               result.link= $(this)
               .children(".feature-text a")
               .attr("href");
               result.image= $(this)
               .children("img")
               .attr("href");
           }) 
           return result;
       }).then( data => console.log(data))       

   
   
   
    // return new Promise
    
}