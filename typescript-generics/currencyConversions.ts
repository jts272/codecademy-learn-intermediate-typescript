// Before Generics

// Line 63 does not catch the error between the conversion rates and the wallet currency

// const conversionRates = {
//   euro: 1.1,
//   inr: 0.012,
//   usd: 1,
// };

// class Wallet {
//   readonly currency: string;
//   private stored: number;

//   constructor(currency: string, remaining: number) {
//     this.currency = currency;
//     this.stored = remaining;
//   }

//   spend(amount: number) {
//     if (this.stored < amount) {
//       return false;
//     }
//     this.stored -= amount;
//     return true;
//   }

//   transferTo(newCurrency: string) {
//     const newStored =
//       (this.stored / conversionRates.usd) *
//       conversionRates[newCurrency as keyof typeof conversionRates];

//     this.stored = 0;

//     return new Wallet(newCurrency, newStored);
//   }
// }

// interface PriceTag {
//   currency: string;
//   item: string;
//   price: number;
// }

// function purchaseInCurrency(wallet: Wallet, tag: PriceTag) {
//   return wallet.spend(tag.price) && tag.item;
// }

// const americanWallet = new Wallet("usd", 50);

// const hat = purchaseInCurrency(americanWallet, {
//   currency: "usd",
//   item: "cowboy hat",
//   price: 34.99,
// });

// if (hat) {
//   console.log("I purchased a hat! 🤠");
// } else {
//   console.log("I couldn't afford the hat...");
// }

// const falafel = purchaseInCurrency(americanWallet.transferTo("inr"), {
//   currency: "euro",
//   item: "falafel",
//   price: 10,
// });

// if (falafel) {
//   console.log("I purchased falafel! 🥙");
// } else {
//   console.log("I couldn't afford the falafel...");
// }
