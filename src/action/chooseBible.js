const GET_VERISON = 'getVersion';

const SET_VERSION = 'setVersion';

const selector = document.querySelector('#bibleVersion');
const inputField = document.querySelector('#bibleVersionInputField');
const inputButton = document.querySelector('#inputButton');
const errorMessage = document.querySelector('#errorMessage');


//get last selected version
browser.runtime.sendMessage({message: GET_VERISON}).then( version => {
    inputField.value = selector.value = version;
});

//get select element
selector.addEventListener('change', async event => {
    const newTranslation = event.target.value;
    await browser.runtime.sendMessage({message: SET_VERSION, bible: newTranslation });
    inputField.value = newTranslation;
});

inputButton.addEventListener('click', async event => {
    /*
        When "ok" is pressed it checks if the string is a valid translation.
        If it is, it changes the selected translation.
    */
    const value =  inputField.value.toUpperCase();

    if (value in bibleVersions){
        errorMessage.innerHTML = "";
        inputField.value = value;
        await browser.runtime.sendMessage({message: SET_VERSION, bible: value});
        // close browser action dialog uppon valid input
        window.close();
    }else{
        errorMessage.innerHTML = "That is not a valid choice."
    }
});

