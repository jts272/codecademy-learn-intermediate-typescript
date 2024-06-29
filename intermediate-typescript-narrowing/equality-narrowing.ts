function shoutSameWord(mine: any, yours: string) {
  if (mine === yours) {
    console.log(mine.toUpperCase());
  }
}

shoutSameWord(2, "Hello");
shoutSameWord("Hello", "Hello");
