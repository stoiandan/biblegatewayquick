

/*
    Represents a program error
*/

// error if user selection is not text
const NotTextError = 'User selection is not text';

// parsed text si not a valid bible refernece
const NotABibleReferenceError = "Selection is not a valid Bible reference";


class LocalError {

    constructor(type, message) {
        this.type = type;
        this.message = message;
    }
}