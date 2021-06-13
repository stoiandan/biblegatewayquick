
/*
    Creates a context menu in the brwoser page that helps 
    to navigate to biblegateway
*/

// reference parser
const parser = new ReferenceParser();


browser.contextMenus.onShown.addListener(info => {
  const isButtonEnabled = handleUserSelection(info.selectionText);
  browser.menus.update(info.menuIds[0], { enabled: isButtonEnabled });
  browser.menus.refresh();
});

(function createContextMenuEntry() {
  // create context menu button
  browser.menus.create({
    title: "Search '%s' on biblegateway",
    contexts: ["selection"]
  });

  browser.menus.onClicked.addListener(() => {
    // make web request
    openBibleGateway(parser.history.pop().parsed);
  });
})();



function handleUserSelection(selectedText) {
  try {
     parser.parseReference(selectedText);
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}