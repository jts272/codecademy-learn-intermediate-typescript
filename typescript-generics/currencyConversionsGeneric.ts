const conversionRates = {
  euro: 1.1,
  inr: 0.012,
  usd: 1,
};

// Create type from object keys
type CurrencyCode = keyof typeof conversionRates;

// Constrain the passed in Currency to be a valid CurrencyCode
class Wallet<Currency extends CurrencyCode> {
  readonly currency: Currency;
  private stored: number;

  // Ensure class is constructed with a valid CurrencyCode
  constructor(currency: Currency, remaining: number) {
    this.currency = currency;
    this.stored = remaining;
  }

  spend(amount: number) {
    if (this.stored < amount) {
      return false;
    }
    this.stored -= amount;
    return true;
  }

  // NewCurrency must be a valid CurrencyCode
  transferTo<NewCurrency extends CurrencyCode>(newCurrency: NewCurrency) {
    const newStored =
      (this.stored / conversionRates.usd) * conversionRates[newCurrency];

    this.stored = 0;

    return new Wallet(newCurrency, newStored);
  }
}

// Ensure the interface uses a valid CurrencyCode
interface PriceTag<Currency extends CurrencyCode> {
  currency: Currency;
  item: string;
  price: number;
}

// Pass in a valid CurrencyCode for generic use in Wallet and PriceTag
// Note that the parameter types are generic, thus they must be given
// type arguments when calling the function
// Here, a valid CurrencyCode must be passed in and shared around
function purchaseInCurrency<Currency extends CurrencyCode>(
  wallet: Wallet<Currency>,
  tag: PriceTag<Currency>
) {
  return wallet.spend(tag.price) && tag.item;
}

// First argument must be a valid CurrencyCode
const americanWallet = new Wallet("usd", 50);

// This function takes a Wallet and a PriceTag
// Currency is inferred from the Wallet, which is already typed
const hat = purchaseInCurrency(americanWallet, {
  currency: "usd",
  item: "cowboy hat",
  price: 34.99,
});

if (hat) {
  console.log("I purchased a hat! 🤠");
} else {
  console.log("I couldn't afford the hat...");
}

// Tell the function ahead of time to require a specific CurrencyCode
// The second argument, PriceTag, must be of the same CurrencyCode,
// as the generic function definition applies the same type to both type arguments
const falafel = purchaseInCurrency<"euro">(americanWallet.transferTo("euro"), {
  currency: "euro",
  item: "falafel",
  price: 10,
});

if (falafel) {
  console.log("I purchased falafel! 🥙");
} else {
  console.log("I couldn't afford the falafel...");
}
