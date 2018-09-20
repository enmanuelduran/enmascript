---
date: "2018-06-07T17:12:33.962Z"
title: "const, let and var"
summary: "const, let and var, when should I use which?, here some of the most remarkable differences and use cases for each of them."
series: "Javascript"
featuredImage: "2018-07-06-const-let-and-var.png"
---


JavaScript is an amazing and powerful programming language, it allows us to create amazing websites, applications, and way more things that we can imagine in today’s world. In this particular series named _Learning to speak ES6 Javascript,_ we’re going to be breaking down the fundamental parts of the ECMAScript 6 standard, if you feel that the topics in this series are too basic, I invite you to read the series  _Javascript for native speakers_ that we’ll be publishing shortly_._

In this first article, we’re going to start talking about variables and constants definitions, specifically, we’re going to cover the next items for all of them:

-   Definition
-   How to use them
-   Differences between const, let and var
-   When to use them
-   Examples

## const

Allows us to define constants (basically variables whose values can not change over time), constants are  _block-scoped_  meaning that they are isolated by expressions that use curly brackets such as conditionals and loops.

For example, the code below will end up in an error saying that, `MARS_GRAVITY is not defined`

```javascript
if (true) {
    const MARS_GRAVITY = '3.711 m/s²';
}
console.log(MARS_GRAVITY);
```

this happens because the constant was defined inside the conditional block, which means that we can only access it from within its scope, so just move the  `console.log`  inside the conditional and that’s it.

**How to use**

```javascript
const MY_NAME = 'Enmanuel';
```

**When to use:** Use not only when knowing that a type of data remains constant but also when you’re not certain whether data will need to change or not, why? because using it as default helps you realize if a value mutates or not and diminishes the number of mutations, if you never had the need to change it, you know it is a constant.

**Important Note:** The reserved word  _const_  only makes the variable itself immutable which means that if we define an object or an array using it we could still modify the object’s or array’s properties and values, for example:

Let’s say we have the EARTH constant which is assigned an object like so:

```javascript
const EARTH = { type: 'Planet' };
```

If we now try to add a property to EARTH like:

```javascript
EARTH = { type: "Planet", water: true; }
```

We’ll get an error with something like, `Uncaught TypeError: Assignment to constant variable`, excellent, just what we wanted right?, hmm… but wait, what happens if instead, we do something like:

```javascript
EARTH.water = false;
```

Ha!, now we don’t have any more water in our planet EARTH and we’re all gonna die because of it, this behavior occurs because what we’re actually changing is the object’s property, we’re not changing the variable itself, this same principle can be applied to arrays so be aware next time, because we can’t live without water.

## let

We use  _let_  to declare variables that can change over time in our application, _let_ is a  _block-scoped_  declaration as well as  _const_.

**When to use:** As stated previously in const’s definition one implementation that is recommended and commonly used is to start declaring all your variables with  _const_  and if you realize later that one value needs to change during development, you change that declaration to use  _let,_  so the general rule would be to use  _const_ over _let_.

**Example of use:**

```javascript
let names = 'Steve';
console.log(names) // Prints Steve

names = 'Tony';
console.log(names); // prints Tony
```

**Important note:** You can declare a  _let_  or  _const_  variable only once, if you do it again you’ll get an error, for example, based on the code above if you re-assign a value to names using the let reserved word like this:

```javascript
let names = 'Steve';
let names = 'Tony';
```

You will get an error saying that  `'names' has already been declared`

## var

It’s another way of declaring variables but this time _function-scoped_  variables rather than  _block-scoped_  ones, this means that variables defined with  _var_ only respect the scopes of the functions in which they’re declared so if you declare a variable of this type inside a block like an  `if () { ... }` conditional or a `for() { ... }` loop the variable will be declared outside of their inner scope and the value will be available in the whole function, for this reason since  _let_ came out it’s always recommended to use  _let_  instead of  _var_, this being said, here a simple example for  _var_:

```javascript
function favoriteAnimal(person) {
	if (person === 'Jon') {
		var animal = 'direwolf';
	}

	console.log(animal);
}
```

The function  `favoriteAnimal` simply logs the favorite type of animal for Jon, note how the animal variable is declared inside the  `if`  block but the  `console.log`  is executed outside of it and it can still access it without errors. In the other hand if you substitute the code above to use  _let_  instead, you’ll see how it will throw an error saying `animal is not defined` because it’s being scoped to the  `if`  block rather than the function.
