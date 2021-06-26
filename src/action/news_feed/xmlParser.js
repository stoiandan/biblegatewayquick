

const NEWS_FEED_URL =  'https://www.biblegateway.com/votd/get/?format=atom';


(function getXMLNewsFeeD() {
    fetch(NEWS_FEED_URL).then(resp => resp.text())
                        .then(data => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(data, 'text/xml');

                            const verseOfTheDay = doc.querySelector('content').innerHTML;
                            const reference = doc.querySelector('entry > title').innerHTML;
                            renderVerseOfTheDay(verseOfTheDay.slice(9,verseOfTheDay.length - 3) + ' ' + reference);
                        });
})();


 async function renderVerseOfTheDay(verseOfTheDay) {
    document.querySelector('p[id="verseOfTheDay"]').innerHTML = verseOfTheDay;
 }