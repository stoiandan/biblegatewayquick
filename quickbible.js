

const BIBLE_GATEWAY_URL = 'https://www.biblegateway.com/quicksearch/?search=';

const URL_COLON = '%3A';

/*
Main class responsible to parse a Bible reference, e.g. a verse John 21:24
but not necessarily a verse, e.g. John 21:1-3 
*/
class ReferenceParser {
    


    bookPrefixes = {'first'  : '1',
                    'second' : '2',
                    'third'  : '3'   }


    constructor(bibleReference) {
        this.reference = bibleReference
    }

    parseReference() {
        //replace colon with URL code
        words.replace(':',URL_COLON);

        // split the reference -> 1 John 2:3 -> "1", "John" "2:3"
        const words = this.reference.split(" ");

        
        if (words.length > 3) {
            const error = 'Could not parse bible verse: ${this.reference}';
            console.log(error);
            return error;
        }
        //check for 1 Chorintians 4:5.. cases
        if (words.length === 3)
            words[0] = this.checkForLetterToDigit(words[0]);


        return words
    }

    checkForLetterToDigit(chars) {
        chars = chars.toLowerCase();

        const prefix = this.bookPrefixes[chars];

        return prefix ? prefix : chars;            
    }
}


function buildURL(parsedBibleReference) {
    let URL = BIBLE_GATEWAY_URL;

    const URLarhuments  = parsedBibleReference.slice(0, parsedBibleReference.length -1).join('+');

    return BIBLE_GATEWAY_URL + URLarhuments;
}


function OpenNewBibleTab() {
    browser.tabs.create({
        
    });
}




// create context menu button
browser.menus.create({
    "icons": {
        "16": "assets/icons/search_icon_16.png",
      }
});