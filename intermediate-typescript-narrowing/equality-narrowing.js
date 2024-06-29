"use strict";
function shoutSameWord(mine, yours) {
    if (mine === yours) {
        console.log(mine.toUpperCase());
    }
}
shoutSameWord(2, "Hello");
shoutSameWord("Hello", "Hello");
