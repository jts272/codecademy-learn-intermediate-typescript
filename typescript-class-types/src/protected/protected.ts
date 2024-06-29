class SauceHausProtected {
  protected startMixer() {
    console.log("Mixer: Powering on");
  }
}

class SalsaCasa extends SauceHausProtected {
  public prepareSauce() {
    this.startMixer(); // Does not error
    // ...
  }
}

const mySauce = new SauceHausProtected();
// mySauce.startMixer(); // This won't work because protected methods are only accessible within the class and its subclasses, not even the instance

const mySalsa = new SalsaCasa();
mySalsa.prepareSauce(); // No Error, Prints: Mixer: Powering on
// mySalsa.startMixer(); // Raises an error
