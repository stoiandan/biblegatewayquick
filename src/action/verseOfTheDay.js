import { MESSAGES } from "./messages.js";



const para = document.querySelector('p[id="verseOfTheDay"]');

// fetch verse of the day
browser.runtime.sendMessage({message: MESSAGES.GET_VERSE_OF_THE_DAY})
               .then(verse => para.innerHTML = verse );
