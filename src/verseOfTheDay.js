
/*
    Responsible to fetch and store verse of the day
    provide it to browser toolbar
*/

const NEWS_FEED_URL =  'https://www.biblegateway.com/votd/get/?format=atom';

var VERSE_OF_THE_DAY;

var today = new Date().getDay();

async function fetchVerseOfTheDay() {
    return await fetch(NEWS_FEED_URL).then(resp => resp.text())
                        .then(data => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(data, 'text/xml');

                            const verseOfTheDay = doc.querySelector('content').innerHTML;
                            const reference = doc.querySelector('entry > title').innerHTML;
                            return verseOfTheDay.slice(9,verseOfTheDay.length - 3) + ' ' + reference;
                        });
}


// listen to request for providing current bible translation
browser.runtime.onMessage.addListener(req => {
    if (req.message === GET_VERSE_OF_THE_DAY) {
        // get current day to see if verse has expired
        const dayNow = new Date().getDay();

        if(!VERSE_OF_THE_DAY || dayNow !== today) {
            VERSE_OF_THE_DAY = fetchVerseOfTheDay();
            today = dayNow;
        }
        return Promise.resolve(VERSE_OF_THE_DAY);
    }
    return false;
});