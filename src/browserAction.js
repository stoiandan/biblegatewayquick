/*
    Responsible for listening to user input on selected Bible version
    and making the changes for reuqest.js based on user input
    Also responsible for providing latest version to front-end;
*/

const BIBLES = ['NIV', 'NET', 'ESV', 'KJV', 'NKJV'];

// listen to user changes on current bible translation
browser.runtime.onMessage.addListener(req => {
    // for security reasons, not to inject random strings
    if (req.message !== SET_VERSION) {
        // needed for multiple message listener; 
        return false;
    }

    if (!BIBLES.includes(req.bible)) {
        return Promise.reject('no such Bible version in list');
    }
    BIBLE_VERSION = req.bible;
    return Promise.resolve('done!');
});


// listen to request for providing current bible translation
browser.runtime.onMessage.addListener(req => {
    if (req.message === GET_VERSION) {
        return Promise.resolve(BIBLE_VERSION);
    }
    return false;
});