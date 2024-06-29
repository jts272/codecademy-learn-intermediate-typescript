class SauceHausReadonly {
  readonly flavor: string = "Original";

  constructor(customFlavor?: string) {
    if (customFlavor !== undefined) {
      this.flavor = customFlavor;
    }
  }
}

const mySauceHaus = new SauceHausReadonly("Honey");
mySauceHaus.flavor = "Super spicy"; // Raises an error
