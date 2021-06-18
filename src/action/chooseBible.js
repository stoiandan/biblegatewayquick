
//get select element
document.querySelector('#bibleVersion').addEventListener('change', async event => {
    await browser.runtime.sendMessage({bible: event.target.value});
});
