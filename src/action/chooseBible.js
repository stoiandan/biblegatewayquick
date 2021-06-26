
import { MESSAGES } from "./modules/messages.js";
import { dropwDownTranslations, customTranslations } from "./modules/bibleVersions.js";

const CUSTOM = 'CUSTOM';

const selector = document.querySelector('#bibleVersion');
const inputField = document.querySelector('#bibleVersionInputField');
const inputButton = document.querySelector('#inputButton');
const errorMessage = document.querySelector('#errorMessage');
const customAreaDiv = document.querySelector('div.custom_area');

//get last selected version
browser.runtime.sendMessage({message: MESSAGES.GET_VERISON})
               .then(translation => handleTranslationChange(translation));

//get select element
selector.addEventListener('change', async event => {
    const newVal = event.target.value;
    const translation = getTranslation(newVal);

    handleTranslationChange(translation);
    if(newVal === CUSTOM) return;
    
    await browser.runtime.sendMessage({message: MESSAGES.SET_VERSION, bible: newVal, isCustom: false });
    window.close();
});

inputButton.addEventListener('click', async event => {
    /*
        When "ok" is pressed it checks if the string is a valid translation.
        If it is, it changes the selected translation.
    */
    const value = inputField.value.toUpperCase();

     try {
        const translation = getTranslation(value); 
        await browser.runtime.sendMessage({message: MESSAGES.SET_VERSION, bible: translation.bible, isCustom: translation.isCustom});
    } catch(err) {
        errorMessage.innerHTML = err;
        return;
    }
        errorMessage.innerHTML = "";
        window.close();
});


async function handleTranslationChange(translation) {
        if(translation.isCustom) {
            customAreaDiv.style.display = 'block';
            selector.value = CUSTOM;
            inputField.value = translation.bible;
        }  else {
            customAreaDiv.style.display = 'none';
            inputField.value = selector.value = translation.bible;
        }
}

function getTranslation(value) {
    if(value === CUSTOM) return {bible: inputField.value,  isCustom: true};

    if(dropwDownTranslations.includes(value)){
        return {bible: value, isCustom: false};
    }

    if(customTranslations.includes(value)) {
        return {bible: value, isCustom: true};
    }
    throw 'that is not a valid choice.';
}