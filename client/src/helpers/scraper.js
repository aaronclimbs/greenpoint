import cheerio from "cheerio";

export default function scraper(response) {
    const $ = cheerio.load(response.data);
    const result = [];
    console.log(response.data);
    
  
    $(".feature-block").each(function(i, element) {
        const article = {};
      article.title = $(this)
        .find(".feature-text a")
        .attr("title");
      article.link = $(this)
        .find(".feature-text a")
        .attr("href");
      article.image = $(this)
        .find(".feature-img img")
        .attr("src");
        result.push(article);
    });
    return result;
  }
    
