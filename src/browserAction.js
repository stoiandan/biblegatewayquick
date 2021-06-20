/*
    Responsible for listening to user input on selected Bible version
    and making the changes for reuqest.js based on user input
    Also responsible for providing latest version to front-end;
*/

// listen to user changes on current bible translation
browser.runtime.onMessage.addListener(req => {
    // for security reasons, not to inject random strings
    if (req.message !== SET_VERSION) {
        // needed for multiple message listener; 
        return false;
    }
    BIBLE_VERSION = req.bible;

    //store to local storage 
    browser.storage.local.set({ bible: BIBLE_VERSION}).then( () => console.log(`Stored ${BIBLE_VERSION} in storage`),
     err => console.log(`Could not store ${BIBLE_VERSION} in local storage due to ${err}`)
    );
    return Promise.resolve('done!');
});


// listen to request for providing current bible translation
browser.runtime.onMessage.addListener(req => {
    if (req.message === GET_VERSION) {
        return Promise.resolve(BIBLE_VERSION);
    }
    return false;
});

