
const GET_VERISON = 'getVersion';

const SET_VERSION = 'setVersion';

const selector = document.querySelector('#bibleVersion');

//get last selected version
browser.runtime.sendMessage({message: GET_VERISON}).then((version) => {
    selector.value = version;
});

//get select element
selector.addEventListener('change', async event => {
    await browser.runtime.sendMessage({message: SET_VERSION, bible: event.target.value});
});
