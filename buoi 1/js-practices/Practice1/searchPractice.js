'use strict'

function search(input, target) {
    let position = -1;
    ///return input.indexOf(target);  // Remove this line and change to your own algorithm
    for (let i = 0; i < input.length; i++) {
        if (input[i] == target) {
            position = i;
            break;
        }
    }
    return (position);
}

module.exports = search