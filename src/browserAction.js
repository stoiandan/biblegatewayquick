/*
    Responsible for listening to user input on selected Bible version
    and making the changes for reuqest.js based on user input
*/


const BIBLES = ['NIV','NET','ESV','KJV','NKJV'];

browser.runtime.onMessage.addListener(message => {
        // for security reasons, not to inject random strings
        if(BIBLES.includes(message.bible)) {
            BIBLE_VERSION = message.bible;
            return Promise.resolve('done!');
        }
        return Promise.reject('NOT a valid Bible Translation!');
});