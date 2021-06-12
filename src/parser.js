
/*
    Responsible to take as input a string reprenseting Bible refernece (verse or verses)
    and tokenize them in a format more firendly to make a web request
*/


const URL_COLON = '%3A';

const COLON = ':';


class ReferenceParser {
    


    bookPrefixes = {'first'  : '1',
                    'second' : '2',
                    'third'  : '3'   }


    constructor(bibleReference) {
        this.reference = bibleReference
    }

    parseReference() {
        //replace colon with URL code
        this.reference = this.reference.replace(COLON,URL_COLON);

        //trim extra spaces at end or beginning
        this.reference = this.reference.trim(); 

        // split the reference -> 1 John 2:3 -> "1", "John" "2:3"
        const words = this.reference.split(" ");
        
        if (words.length > 3) {
            throw new LocalError(NotABibleReferenceError, 'Selection ${this.reference} is not a valid Bible reference');
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