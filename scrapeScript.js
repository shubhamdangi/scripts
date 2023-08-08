const fs = require("fs");
const puppeteer = require("puppeteer");

async function scrapeData() {
  try {
    const url =
      "";
    // Replace with the URL you want to scrape

    // Launch a headless browser with Puppeteer
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Navigate to the URL
    await page.goto(url);

    const xpathList = [
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/ul[1]/li[2]/span/span[2]",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[3]/table/tbody/tr[2]/td[1]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[3]/table/tbody/tr[2]/td[2]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[4]/table/tbody/tr[2]/td[1]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[4]/table/tbody/tr[2]/td[2]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[3]/table/tbody/tr[3]/td[1]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[3]/table/tbody/tr[3]/td[2]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[4]/table/tbody/tr[3]/td[1]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[4]/table/tbody/tr[3]/td[2]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[3]/table/tbody/tr[4]/td[1]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[3]/table/tbody/tr[4]/td[2]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[4]/table/tbody/tr[4]/td[1]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[4]/table/tbody/tr[4]/td[2]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[3]/table/tbody/tr[5]/td[1]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[3]/table/tbody/tr[5]/td[2]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[4]/table/tbody/tr[5]/td[1]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[4]/table/tbody/tr[5]/td[2]/span/span",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/ul[1]/li[1]/span/span[2]",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/p[10]/span/span[2]",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/p[12]/span/span[2]",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/p[14]/span/span[1]/strong",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/p[16]/span/span[1]/strong",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/ul[3]/li[1]/span/span/text()",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/ul[3]/li[2]/span/span[2]",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/ul[2]/li[1]/span/span/text()",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/ul[2]/li[2]/span/span[2]",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/ul[2]/li[3]/span/span[2]",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/ul[2]/li[4]/span/span[2]",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/p[14]/span/span[2]",
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/p[16]/span/span[2]",
    ];

    //array to store the values of xpaths
    let xpathValues = [];

    let firstStringPartOne;
    let firstStringPartTwo;
    let secondStringPartOne;
    let secondStringPartTwo;
    let bottomImgSrc;

    await Promise.all(
      xpathList.map(async (xpath) => {
        try {
          const element = await page.$x(xpath);
          if (!element || element.length === 0) {
            throw new Error(`No element found for XPath: ${xpath}`);
          }

          const value = await page.evaluate((el) => el.textContent, element[0]);
          console.log("Scraping data...", xpathList.indexOf(xpath));
          console.log("Value:", value);
          xpathValues.push(value);
        } catch (error) {
          console.error("Error while scraping:", error.message);
        }
      })
    );

    let val1 = xpathValues[28];
    let val2 = xpathValues[29];

    // Evaluate the XPath expression to extract the 'src' attribute of the <img> tag
    const imgXPath =
      "/html/body/section/div/div[2]/div/div[1]/div/div[2]/div[1]/div[5]/figure[5]/img"; // Replace with your specific XPath to select the <img> tag
    const imgElement = await page.$x(imgXPath);

    bottomImgSrc = await page.evaluate(
      (el) => el.getAttribute("src"),
      imgElement[0]
    );

    function separateString(val1) {
      // Extract the first part "236 runs"
      let firstPart = val1.split(" (")[0];

      // Extract the second part "(Last 10 ODIs played)"
      let startIndex = val1.indexOf("(");
      let endIndex = val1.lastIndexOf(")");
      let secondPart = val1.substring(startIndex, endIndex + 1);

      return { firstPart, secondPart };
    }

    // Define input strings
    let inputString1 = val1;
    let inputString2 = val2;
    // Add more input strings if needed

    // Extract data for each input string
    let result1 = separateString(inputString1);
    let result2 = separateString(inputString2);
    // Add more result variables if needed

    // Extracting individual parts from the results
    firstStringPartOne = result1.firstPart;
    firstStringPartTwo = result1.secondPart;
    secondStringPartOne = result2.firstPart;
    secondStringPartTwo = result2.secondPart;
    // Add more variables if needed
    const FinalHtmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <div class="venue3-container">
                  <div class="venue-stat" id="venue1">
                      <p class="venue-1">${xpathValues[20]}</p>
                      <p class="score">${firstStringPartOne}</p>
                      <p class="venue-1">${firstStringPartTwo}</p>
                  </div>
              </div>
              <div class="venue3-container">
                  <div class="venue-stat" id="venue3">
                      <p class="venue-1">${xpathValues[21]}</p>
                      <p class="score">${secondStringPartOne}</p>
                      <p class="venue-1">${secondStringPartTwo}</p>
                  </div>
              </div>
    <body>
        
    </body>
    </html>`;

    fs.writeFileSync("finalProduct.html", FinalHtmlContent);

    console.log(
      "\nData scraped successfully!\nNew file 'finalProduct.html' Created!\nScrapped data successfully injected into 'finalProduct.html'\n\nPowered by MarkTech.\n"
    );

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

scrapeData();
