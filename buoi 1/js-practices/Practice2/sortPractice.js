'use strict'

function sort(input) {
    // return input.sort((a,b) => a-b); // Remove this line and change to your own algorithm
    for (let i = 0; i < input.length; i++) {
        let maxnumber = input[0];
        for (let j = 0; j < input.length - i - 1; j++) {
            if (input[j] > input[j + 1]) {
                maxnumber = input[j];
                input[j] = input[j + 1];
                input[j + 1] = maxnumber;
            }
        }
    }
    return (input);
}

module.exports = sort