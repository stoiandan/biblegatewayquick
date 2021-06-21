
/*
    Responsible for making web requests to biblegateway.com
    and handle tab logic
*/

const BIBLE_GATEWAY_URL = 'https://www.biblegateway.com/quicksearch/?search=';


var BIBLE_VERSION = {bible: 'NIV', isCustom: false};

// initialize bible version
browser.storage.local.get('BIBLE_VERSION')
                     .then(resp => BIBLE_VERSION = resp.BIBLE_VERSION || BIBLE_VERSION);

function buildURL(parsedBibleReference) {
    let URL = BIBLE_GATEWAY_URL;

    const URLarguments  = parsedBibleReference.join('+');

    const bibleVersionParam = '&version=' + BIBLE_VERSION.bible;

    return BIBLE_GATEWAY_URL + URLarguments + bibleVersionParam;
}


function openBibleGateway(parsedBibleRefernece) {
    //get URL
    const bibleURL = buildURL(parsedBibleRefernece);

    // open new tab
    const newTab = browser.tabs.create({
        url: bibleURL
    });
    newTab.then(onCreated, onError);
}


function onCreated(tab) {
  console.log(`Created new tab: ${tab.id}`)
}

function onError(error) {
  console.log(`Error: ${error}`);
}