const GET_VERISON = 'getVersion';

const SET_VERSION = 'setVersion';

const selector = document.querySelector('#bibleVersion');


//get last selected version
browser.runtime.sendsMessage({message: GET_VERISON}).then((version) => {
    selector.value = version;   
});

document.body.style.backgroundColor = "red";

//get select element
selector.addEventListener('change', async event => {
    await browser.runtime.sendMessage({message: SET_VERSION, bible: event.target.value});
});


async function setTranslation(){;
    
    const value = document.getElementById('#bibleVersionInputField').value
    document.getElementById('#bibleVersionInputField').value = "xd";
    if(value in bibleVersions){
        await browser.runtime.sendMessage({message: SET_VERSION, bible: value})
    }    
}

