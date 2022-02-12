---
date: '2019-02-27T17:11:50.962Z'
title: 'Higher order functions and some great applications in javascript'
summary: "Higher order functions are one of the strongest arguments behind functional programming, in this article we're going to explore some interesting applications behind it..."
series: ['Javascript']
featuredImage: '2019-02-27-HOF.png'
reddit: 'https://www.reddit.com/r/javascript/comments/awihb1/higher_order_functions_and_some_great/'
leenker: 'https://leenker.com/leenk/17092/higher-order-functions-and-some-great-applications-in-javascript'
---

## What are Higher order functions?

_Higher order functions (HOF)_ are a very powerful concept, in a nutshell we could say that a HOF is a function that takes another function as an argument and/or returns a function, so based on this we could say they are higher order functions because they _somehow_ act as a "parent" or "wrapper" for other functions.

If you are a developer that has worked with functional programming you probably know already what I'm talking about, but still, keep reading!

## Example

Let's say we have this requirement:

<mark>Implement a function that counts from a given starting point to 100, if the given point is an odd number the function will count in intervals of 5, if in the contrary the number is even then it'll count in intervals of 10. Please, take into consideration that sometimes the user will require to trigger the counter right after providing the starting point _but it'll not always be the case_, a user might be able to provide a starting point and then require to trigger the counter at a later point in the flow (not immediately after).</mark>

so, the first implementation for this without using higher order functions might look like this:

```javascript
const counterToOneHundred = startingPoint => {
    const isOdd = startingPoint % 2;
    const interval = isOdd ? 5 : 10;

    for (let i = startingPoint; i < 100; i += interval) {
        console.log(`${i} of 100`);
    }
};
```

Excellent we got it... right? let's see our checklist:

1.  [x] Receives a starting point
2.  [x] If the starting point is an odd number it counts in intervals of 5
3.  [x] If the starting point is an even number it counts in intervals of 10
4.  [x] It's able to execute the counter immediately after providing the starting point
5.  [ ] It's able to execute the counter at a later point in the flow

AH! we're missing one requirement, we almost got it, let's try and check that last element of our list:

```javascript
const startingPoint = 5; // starting point being any number

const counterToOneHundred = () => {
    const isOdd = startingPoint % 2;
    const interval = isOdd ? 5 : 10;

    for (let i = startingPoint; i < 100; i += interval) {
        console.log(`${i} of 100`);
    }
};
```

Now because we took the `startingPoint` out of the function scope we're able to execute the counter independently from the variable definition, and this means, we can check that last element:

5.  [x] It's able to execute the counter at a later point in the flow

**Woohoo!** that wasn't so bad, right? but wait there are a couple of things we're missing here:

1. To be able to define the `startingPoint` and execute the counter _independently_ we're exposing a variable outside of the implementation of the counter.
2. We're calculating the intervals when we execute the function but the value required to make this calculation `startingPoint` is available way before, which means we could have calculated this in advance to avoid doing everything at once inside the function. We could achieve this by moving the definitions of variables `isOdd` and `interval` outside of the function but if we do it we'd be exposing more variables outside of the function.
3. Having exposed variables increases the risk of having mutations in our application, and, therefore inconsistencies.

Ok, that's not good...

I know this now looks like a sad story... but, **IT. IS. NOT.**

(epic hero entrance).

### Higher order functions to the rescue

Fewer words, more code:

```javascript
const counterToOneHundred = startingPoint => {
    const isOdd = startingPoint % 2;
    const interval = isOdd ? 5 : 10;

    return () => {
        for (let i = startingPoint; i < 100; i += interval) {
            console.log(`${i} of 100`);
        }
    };
};
```

**BOOM!** that's it, have a nice day... just kidding, now let's see our new checklist and then explain the non trivial points:

**Super powered checklist:**

1.  [x] Receives a starting point: **Yes.** (Passed as an argument).
2.  [x] If the starting point is an odd number it counts in intervals of 5: **Yes**.
3.  [x] If the starting point is an even number it counts in intervals of 10: **Yes.**
4.  [x] It's able to execute the counter immediately after providing the starting point
5.  [x] It's able to execute the counter at a later point in the flow
6.  [x] It keeps the variables encapsulated, isolated from the outer scope.
7.  [x] Makes the calculations for `interval` when needed.

### Point 4. "It's able to execute the counter immediately after providing the starting point"

**Yes.** When we execute our function like `counterToOneHundred(1)()` we're defining the variables and returning the anonymous function definition inside in the first function call and then executing the inner function in the second call.

### Point 5, "It's able to execute the counter at a later point in the flow" and point 7. "Makes the calculations for interval when needed"

**Yes.** We can save the return of the first function call and then call the inner function when needed:

The code below saves the definition of the anonymous child function in a variable and makes the `interval` calculations.

```javascript
const counter = counterToOneHundred(1);
```

Then we execute the counter at a later point when needed

```javascript
counter();
```

**Wonderful!**

### Point 6, "It keeps the variables encapsulated, isolated from the outer scope"

Since all variables are inside the function scope, that is **Affirmative**.

So, by making use of a HOF we were able to

-   Encapsulate our data.
-   Increase the flexibility of our implementation.
-   Optimize the code and order of execution of processes.

not too shabby, right?

### A more realistic example

Now, it's enough of counters, let's use HOF for a better example, a more realistic one, <mark>Imagine we need to create three social share buttons to post our current page on twitter, facebook or Linkedin, these buttons will open a popup when clicking on them depending on the network clicked.</mark>

The implementation of this could look something like:

```javascript
const share = () => {
    /* We setup the data required here to be able to save it in advance */
    const pageUrl = 'https://enmascript.com';
    const pageTitle = 'A place to share about web development and science';
    const networks = {
        twitter: `https://twitter.com/share?url=${pageUrl}&text=${pageTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
        linkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}`
    };

    /**
     * We receive the network type and return a function
     * with the event which is binded to the click.
     */
    return network => event => {
        event.preventDefault();

        /* if the network is not valid return */
        if (!(network in networks)) {
            return false;
        }

        /* open the popup with the selected network */
        const networkWindow = window.open(
            networks[network],
            'network-popup',
            'height=350,width=600'
        );

        /* Apply the focus to the popup window after opening it */
        if (networkWindow.focus) {
            networkWindow.focus();
        }
    };
};
```

And the possible usage of this (let's say on _React_) would look something like:

```javascript
/* We setup the data once */
const shareOn = share();

/* We validate each network and open the popup on click */
<div onClick={shareOn('twitter')}><Twitter /></div>
<div onClick={shareOn('facebook')}><Facebook /></div>
<div onClick={shareOn('linkedIn')}><LinkedIn /></div>
```

Cool, right?, on this implementation we're also making use of a concept called _Currying_, but that is a topic that I'd prefer to tackle in another article.

## Great functionalities implemented with Higher Order Functions.

There are many applications for higher order functions, below some functionalities implemented with this approach.

### Error Catcher

Allows you to catch javascript errors easily by passing a function definition, it automatically tries to execute it and if it fails then sends a fallback message, you can replace the fallback action with whatever you want.

**Implementation**

```javascript
function errorCatcher(cb) {
    try {
        cb();
    } catch (error) {
        console.log('Ups, Looks like something went wrong!');
    }
}
```

**Usage**

```javascript
function sayHi() {
    const person = { name: 'Daniel' };

    console.log(`Hi, ${person.name} ${person.career.name}`);
}

errorCatcher(sayHi);
```

### Throttler

Controls the execution of a function `throttledFn` so that it's executed in intervals of `delayTime`, especially useful to avoid executing events with an elevated number of sequential executions (scroll events, resize events).

**Implementation**

```javascript
function throttle(throttledFn, delayTime) {
    let lastCallTime = 0;

    return (...args) => {
        const currentCallTime = new Date().getTime();

        if (currentCallTime - lastCallTime < delayTime) return;

        lastCallTime = currentCallTime;
        throttledFn(...args);
    };
}
```

**usage**

```javascript
function logger() {
    console.log(`I'm executed every 200ms when actively scrolling`);
}

window.addEventListener('scroll', throttle(logger, 200));
```

### A simple performance check for a function

Checks the time a function takes to execute.

**Implementation**

```javascript
function performance(fn) {
    console.time('fn');
    fn();
    console.timeEnd('fn');
}
```

**Usage**

```javascript
function loop() {
    for (i = 0; i < 1000; i++) {
        console.log('executing loop to 1000');
    }
}

performance(loop);
```

As you see Higher order functions are very useful, they're widely used and you may have been using them without noticing, they're applied in Object Oriented Programming when using the _decorator pattern_, they're also used in libraries like `express` and `redux`.

I hope you found this article useful, if you did please share with your friends, also you can follow me on [Twitter](https://twitter.com/duranenmanuel), see you in the next one guys.
