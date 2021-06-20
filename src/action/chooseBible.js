const GET_VERISON = 'getVersion';

const SET_VERSION = 'setVersion';

const selector = document.querySelector('#bibleVersion');
const inputField = document.querySelector('#bibleVersionInputField');
const inputButton = document.querySelector('#inputButton');
const errorMessage = document.querySelector('#errorMessage');


//get last selected version
browser.runtime.sendMessage({message: GET_VERISON}).then((version) => {
    selector.value = version;
    inputField.value = version;
});

//get select element
selector.addEventListener('change', async event => {
    await browser.runtime.sendMessage({message: SET_VERSION, bible: event.target.value});
});

inputButton.addEventListener('click', async event => {
    const value =  inputField.value;

    if (value in bibleVersions){
        errorMessage.innerHTML = "";
        inputField.value = bibleVersions[value];
        await browser.runtime.sendMessage({message: SET_VERSION, bible: value});
    }else{
        errorMessage.innerHTML = "That is not a valid choice."
    }
});

