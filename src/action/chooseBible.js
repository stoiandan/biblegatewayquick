const GET_VERISON = 'getVersion';

const SET_VERSION = 'setVersion';

const selectorBibles = ['NIV','NET','KJV','NKJV','ESV'];

const selector = document.querySelector('#bibleVersion');
const inputField = document.querySelector('#bibleVersionInputField');
const inputButton = document.querySelector('#inputButton');
const errorMessage = document.querySelector('#errorMessage');
const customAreaDiv = document.querySelector('div.custom_area');

//get last selected version
browser.runtime.sendMessage({message: GET_VERISON}).then( version => {
    inputField.value = selector.value = version;
});

//get select element
selector.addEventListener('change', async event => {
    const newVal = event.target.value;
    handleCustomArea(newVal);
    if(newVal === 'CUSTOM') return;
    
    await browser.runtime.sendMessage({message: SET_VERSION, bible: newTranslation });
    window.close();
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
        window.close();
    }else{
        errorMessage.innerHTML = "That is not a valid choice."
    }
});


async function handleCustomArea(newVal) {
        if(newVal === 'CUSTOM') 
            customAreaDiv.style.display = 'block';
        else
        customAreaDiv.style.display = 'none';
}