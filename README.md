# Learn Intermediate TypeScript

https://www.codecademy.com/courses/learn-intermediate-typescript/informationals/welcome-to-learn-intermediate-type-script

## TypeScript Configuration

### TypeScript Development in VSCode

- Enable TypeScript Validation in Settings (enabled by default).
- Hover over errors, or use the **Problems Panel**.
  - Pay attention to new errors that may arise here when making changes to the project's `tsconfig.json`.

### Using TypeScript on the Command Line

Install globally with:

```bash
npm install --global typescript
```

Run the following to transpile a single file into JavaScript:

```bash
tsc <filename>.ts
```

Configure the transpiler with CLI flags, such as:

```bash
tsc <filename>.ts --target esnext
```

TypeScript CLI reference: https://www.typescriptlang.org/docs/handbook/compiler-options.html

### Using TypeScript in a Project

TypeScript, or `tsc` can be installed as a dev dependency in a project, such that we have a specific version attached to the project that will always work. Here are the steps to do so:

1. `npm init --yes`
2. `npm install --save-dev typescript`
3. Add `"tsc": "tsc"` to the `scripts` object in `package.json`.
4. Init the TypeScript project with `npm run tsc -- --init`.
   - This creates the `tsconfig.json` file, which is used to configure the project.
   - This is ran from the packages installed in the project.
   - _The `--` is used to denote that the subsequent flags are to be passed to the `tsc` part of the command, not the `npm run` command that invoked the configured script._
5. Run TypeScript within the project with `npm run tsc`.

`tsconfig.json` reference: https://www.codecademy.com/courses/learn-typescript/articles/the-tsconfig-json-file

#### Running `tsc` automatically

We can use "watch mode" to monitor for file changes and run the `tsc` compiler again automatically:

```bash
npm run tsc -- --watch
```

### Common TypeScript Configurations

We can configure how TypeScript checks and transpiles our projects. See the configuration reference for more: https://www.typescriptlang.org/tsconfig

Most of the options we define are in `compilerOptions`. Here are some common configuration properties:

- `strict`
- `paths`: Allows for re-mapping imports.
- `allowJs`: Allows constructs defined in JavaScript files to factor into type-checking TypeScript files.
- `noUnusedParameters`
- `noUnusedLocals`
- `sourceMap`: Generates source map files, helpful for debuggers and error reporting services, by displaying the original TypeScript code, instead of the minified and transpiled JavaScript code.
- `resolveJsonModule`: Allows importing `*.json` files inside TypeScript files.

#### Using Community Created Configurations

The TypeScript community maintains a variety of configuration **bases**, that can be installed as a dependency for using in `tsconfig.json`. View a variety of configuration bases here: https://github.com/tsconfig/bases/

We can install a base configuration like so:

```bash
npm install --save-dev @tsconfig/recommended
```

We use the **base** as the value of the `extends` key in our `tsconfig.json` file, then override as necessary:

```json
{
  "extends": "@tsconfig/recommended/tsconfig.json",
  "compilerOptions": { ... }
}
```

#### Creating a Shared Configuration

We can create a custom base of our own, such as `custom-tsconfig.json`, then **extend** it in a project's own `tsconfig.json`.

A common pattern for teams is to create an npm package for the base configuration, which can then be shared around. This means the codebase will behave the same by default when running TypeScript's type checking and transpilation features.

## TypeScript Class Types

The following are **access modifier** keywords for our classes' **properties** and **methods**.

- `public`: Useful for readability, since _all properties and methods are public by default_ in JavaScript!
- `private`: Prevents access from all **derived** classes and **instances**.
- `protected`: A **derived** class may access this, but the **instance** still cannot. _An inherited version of `private`_.
- `readonly`: Prevents reassigning a property or method, **except in the class' `.constructor()` method**. Useful when you only want **consumers** of the class to set this value at instantiation.
  - A default value can be set in the Class definition, thereby making it _optional_ in the constructor.
  - You can't reassign a `readonly` property in a subclass, so it appears that a value must be provided in the subclass' constructor, as it will not fallback to the default value provided in the superclass by default.

**Class types** (access modifiers) allow developers to set up OOP patterns by enforcing how properties and methods may be used in a program.

## Intermediate Type Narrowing

As we define more complex types, we need additional ways to narrow those them. Take the following example; TypeScript needs more information to narrow the following statement:

```ts
function isFood(grocery: Food | Drink) {
  return "eat" in grocery;
}
```

### Type Predicates

These are considered as "user-defined" **type guards**, making use of the special `is` keyword. The return type syntax is `<return value> is <type>`. The example below performs a presence check for an `expense` member in the `bill` object. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in for reference on the `in` operator.

```ts
// Predicate
function isExpensable(bill: Bill): bill is Expensable {
  return "expense" in bill;
}

// Usage
function checkForRefunds(bill: Bill) {
  if (isExpensable(bill)) {
    bill.expense();
  }
  bill.process();
}
```

### Equality Narrowing

If we can ascertain that the type of a value is equal to something with a known type, we can narrow by type and value at the same time.

```ts
function shoutSameWord(mine: any, yours: string) {
  if (mine === yours) {
    console.log(mine.toUpperCase());
  }
}

shoutSameWord(2, "Hello"); // No output
shoutSameWord("Hello", "Hello");
```

Elevator pitch: simultaneously narrow down the type of a variable and check for its equality with a specific value.

### Discriminated (or Tagged) Unions

If multiple classes/types share a property name with a literal value, we can use the property-in-common to switch on for narrowing purposes:

```ts
// Setup
type Admin = {
  role: "Admin";
  privileges: string[];
};

type User = {
  role: "User";
  username: string;
};

type AppUser = Admin | User;

// Usage
function getUserInfo(user: AppUser): string {
  switch (user.role) {
    case "Admin":
      return `Admin with privileges: ${user.privileges.join(", ")}`;
    case "user":
      return `User with username: ${user.username}`;
  }
}
```

In summary, they use a common, literal property to distinguish between types in a union.

## Intermediate TypeScript Generics

**Generics** is a way to declare that the type of some code can be swapped out with different types.

Write a generic **type parameter** with `<>` syntax.

### Generic Classes

By specifying a **type parameter** on a class definition, that type can be used on the class' **properties**.

```ts
class Box<Value> {
  contents: Value;

  constructor(contents: Value) {
    this.contents = contents;
  }
}
```

This type parameter can also be inferred, based on how the constructor is called. The example below creates `Box<boolean>`.

```ts
const catBox = new Box(Math.random() > 0.5);
```

If the type parameter _can't_ be inferred by TypeScript, it should be added manually. An example is when declaring a variable with a **type annotation**:

```ts
let laterBox: Box<boolean>;

laterBox = new Box(Math.random() > 0.5);
```

Once an instance of a generic class is created, **the type parameters cannot change**.

### Type Parameter Defaults

Sometimes, a type parameter is almost always used with the same type. We can set a default with `=`. The default value will be used _if not specified or inferred as something else_. This applies individually to any instance of the generic class.

```ts
type Container<Contents = string> = {
  contents: Contents;
};
```

### Type Parameter Constraints

By using the `extends` keyword, we can constrain the type parameter to be of a certain set of values. Otherwise, we could pass in any different type.

In this context, think of `extends` as **constrains**.

```ts
type LabeledSet<Label extends string> = {
  label: Label;
  size: number;
};

// Type parameter includes all properties of constrained type

let plate: LabeledSet<"appetizer" | "entree">;

plate = { label: "appetizer", size: 7 };

console.log(plate.label.toUpperCase() + "!"); // String method Ok
```

### Keyof Type Parameters

The `extends` keyword can be combined with `keyof`. `keyof` retrieves the allowed **keys** of a **type**.

In the following example `get` method, `Container` can be any type, but `Key` _must_ be a key of whatever `Container` is.

```ts
function get<Container, Key extends keyof Container>(
  container: Container,
  key: Key
) {
  return container[key]; // Always a key of of `Container`
}
```

If `key` was annotated as `string` for example, TypeScript would have complained that the key _might not be one of the known properties_ of `Container`.

### Currency Conversions

See a full example of these generic techniques in action in the [Currency Conversions](./typescript-generics/currencyConversionsGeneric.ts) program.
