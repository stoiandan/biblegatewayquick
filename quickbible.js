/*
Main class responsible to parse a Bible reference, e.g. a verse John 21:24
but not necessarily a verse, e.g. John 21:1-3 
*/
class ReferenceParser {

    // some bible books start with a "prefix" e.g. 1 Chorinstians, one may types first Chorintians
     prefixes = ['1','2','3','first','second','third']
    
    constructor(bibleReference) {
        this.reference = bibleReference
    }

    parseReference() {
        // split the reference -> 1 John 2:3 -> "1", "John" "2:3"
        const words = this.reference.split(" ");

        switch (words.length) {
            // 1 Chorintians 2:4-4
            case 3:
            break;
            //John 5:3-4 or John 2:4
            case 2:
            break;
            default:
                const error  = 'Could not parse bible verse: ${this.reference}';
            console.log(error);
            return error;
        }
    }
}