const puppeteer=require('puppeteer');
const BASE_URL='https://www.instagram.com/';

const TAG_URL=(tag) => `https://www.instagram.com/explore/tags/${tag}/`;

const instagram={
  browser:null,
  page:null,

  initialize: async() => {

    instagram.browser=await puppeteer.launch({
      headless:false
    });

    instagram.page=await instagram.browser.newPage();

    
  },

  login : async(username,password) => {

    await instagram.page.goto(BASE_URL,{waitUntil: 'networkidle2'});

    await instagram.page.waitFor(1000);
    /*Writing username and password*/
    
   await instagram.page.type('input[name= "username"]',username, {delay: 50});
   await instagram.page.type('input[name= "password"]',password, {delay: 50});

    /*Clicking on login button */

    
   let loginButton = await instagram.page.$x('//div[contains(text(), "Log In")]');
   await loginButton[0].click();
   await instagram.page.waitFor(1000);
   

  },

  likeTagsProcess : async (tags =[]) => {
    
  
    /*Looping through each tag*/
    for(let tag of tags){

      /*Go to the tag page */
      await instagram.page.waitFor(1000);
      await instagram.page.goto(TAG_URL(tag), {waitUntil: 'networkidle2'});
      
      let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]');
     
        
      for(i=0; i<3; i++){

        let post = posts[i];
        
        /*Click on the post*/
        await post.click();
        await instagram.page.waitFor(1000);



        //Wait for page to appear
       // await instagram.page.waitFor('body[style="overflow:hidden"]');
        await instagram.page.waitFor('div[role="dialog"]');
        await instagram.page.waitFor(2000);
        
        let isLikeable = await instagram.page.$('svg[aria-label="Like"]');
       
        if(isLikeable){
        
          await instagram.page.click('svg[aria-label="Like"]');

        }
        
        await instagram.page.waitFor(3000);

        /*Close the modal*/
        await instagram.page.click('svg[aria-label="Close"]');
        await instagram.page.waitFor(1000);

      }

      await instagram.page.waitFor(10000);

    }

  }

}

module.exports=instagram;
