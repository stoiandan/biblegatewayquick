
/*
    Creates a context menu in the brwoser page that helps 
    to navigate to biblegateway
*/


// enable or disable button
let isButtonEnabled = true;

// create context menu button
browser.menus.create({
    title: "Search '%s'on biblegateway",
    contexts: ["selection"],
    enabled: isButtonEnabled
  });
  
  browser.menus.onClicked.addListener(function(contextInfo, tab) {
      let words;
      try {
        words = handleUserSelection(contextInfo);
      } catch(err) {
          return;
      }

      // make web request
      openBibleGateway(words);
  });



  function handleUserSelection(contextInfo) {
      const selectedText = contextInfo.selectionText;

      try {
         if(selectedText === null) throw NotTextError;

         const parser = new ReferenceParser(selectedText);

         const words = parser.parseReference(); 

         isButtonEnabled = true;

         return words;
      }   catch(err) {
        //disable button 
        isButtonEnabled = false;
        console.log(err);
        throw err;
      }   
  }