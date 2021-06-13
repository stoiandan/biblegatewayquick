
/*
    Responsible to take as input a string reprenseting Bible refernece (verse or verses)
    and tokenize them in a format more firendly to make a web request
*/


const URL_COLON = '%3A';

const COLON = ':';


class ReferenceParser {

    prefixes = ['1','2','3'];


    bibleBooks = [ // All 66 Protestant Bible Books
        // Old Testmanet
        "genesis", "exodus", "leviticus", "numbers", "deuteronomy", "joshua",
        "judges", "ruth", "1 samuel", "2 samuel", "1 kings", "2 kings", "1 chronicles", "2 chronicles",
        "ezra", "nehemiah", "esther", "job", "psalms", "proverbs", "ecclesiastes", "song of Solomon",
        "isaiah", "jeremiah", "lamentations", "ezekiel", "daniel", "hosea", "joel", "amos", "obadiah",
        "jonah", "micah", "nahum", "habakkuk", "zephaniah", "haggai", "zechariah", "malachi",
        //New Testament
        "matthew", "mark", "luke", "john", "acts", "romans", "1 corinthians", "2 corinthians", "galatians", "ephesians",
        "philippians", "colossians", "1 thessalonians", "2 thessalonians", "1 timothy", "2 timothy", "titus",
        "philemon", "hebrews", "james", "1 peter", "2 peter", "1 john", "2 john", "3 john", "jude", "revelation"];


    constructor() {
        this.history = [];
    }

    parseReference(bibleReference) {
        //replace colon with URL code
        bibleReference = bibleReference.replace(COLON, URL_COLON);

        //trim extra spaces at end or beginning
        bibleReference = bibleReference.trim();

        // split the reference -> 1 John 2:3 -> "1", "John" "2:3"
        const words = bibleReference.split(" ");

        if (!this.isBibleBook(words)) {
            throw new LocalError(NotABibleReferenceError, 'Selection ${bibleReference} is not a valid Bible reference');
        }
        // if only book, add automatically chapter 1 as beginning 
        const isBookWithNoChapter = words.length === 1 || (words.length == 2 && this.prefixes.includes(words[0]));
        if(isBookWithNoChapter) {
            words.push('1');
        }

        this.reference = { text: bibleReference, parsed: words };
        return words;
    }


    isBibleBook(words) {
        this.correctBookPrefix(words);

        let potentialBibleBook;

        // concat prefix to bible book
        if(this.prefixes.includes(words[0])) {
            potentialBibleBook = words.slice(0, 2).join(' ');
        } else {
            potentialBibleBook = words[0    ]
        }

        potentialBibleBook = potentialBibleBook.toLowerCase();

        if (!this.bibleBooks.includes(potentialBibleBook)) {
            return false;
        }

        return true;
    }

    correctBookPrefix(words) {
        const bookPrefixes = { 'first': '1', 'second': '2', 'third': '3' };
        if (words[0] in bookPrefixes) {
            words[0] = bookPrefixes[words[0]];
        } 
    }
}