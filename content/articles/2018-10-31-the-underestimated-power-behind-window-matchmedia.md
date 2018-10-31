---
date: '2018-10-31T09:30:23.912Z'
title: "The underestimated power behind matchMedia"
summary: "In this article we're going to learn how to improve the performance by using an alternative to resize events"
series: 'Javascript'
featuredImage: '2018-10-31-window-matchmedia.png'
---

Media query based interactions are a very important part of our applications for several reasons, one of the most important ones is that they allow us to give our users better experiences based on the device they're using. Usually, when you want to show/hide or change something for certain devices you only define some media queries in _CSS_ and that's it, but... what happens when we need to make dynamic experiences with javascript in responsive sites? currently, the most popular answer to this question would be to use a resize event listener that executes some code when the `window.innerWidth` or `window.innerHeight` meets our condition, something like:

```javascript
// Do something for some specified breakpoints
function doSomething() {
    if (window.innerWidth > 768) {
        /* do Something */
    }
}

// Add a listener somewhere
window.addEventListener('resize', doSomething);
```

But this is not all, since the `resize` event is an _expensive_ operation for the browser, we would probably end up adding a _throttle_ or _debounce_ function to the handler in order to release some stress, this indirectly means having to use a library like _lodash_ or implement our own functions to achieve it, damn, if we only had an API to handle media queries in _JavaScript_ just like if it was _CSS_... without having to worry about extra validations for each breakpoint, debouncing and all of these absurd limitations...

## Introducing matchMedia API
[matchMedia](https://developer.mozilla.org/es/docs/Web/API/Window/matchMedia) is an [amazingly well-supported API](https://caniuse.com/#feat=matchmedia) that allows us to basically attach listeners to media queries instead of the classic resize events, allowing us to only add the code that we want to execute and freeing us from all the extra validations. Also, it has a better performance than the traditional methods because it doesn't constantly execute checks or call functions, it does it only once when the media query condition is met. Excellent, it all sounds great, but, how can we implement it? say no more, here is an example:

```javascript
// Define a MediaQueryList Object with your media query passed like in CSS
const mediaQueryListObject = window.matchMedia('(min-width: 768px)');

// Define the code to execute
function doSomething() { /* Some code to execute */ }

// Attach the event listener with the function to execute
mediaQueryListObject.addListener(doSomething);

// Execute your function once in case your current screen size
// already mets the media query conditions
doSomething();
```

And this is how you would remove a listener:

```javascript
mediaQueryListObject.removeListener(doSomething);
```

I want you to notice something, check the way we're passing the media query to the `matchMedia` function, `(min-width: 768px)`, just like if it was _CSS_, isn't this beautiful? this means that we can get as creative and specific with our media queries as we want and even better this would help us synchronize our CSS and JavaScript breakpoints together.

### Some tradeoffs to consider and a library that will make your life easier
1. If you want to remove an event listener you now need to have access to the reference of both the `mediaQueryListObject` variable and the `doSomething` function, why is this a problem? because many times you want to remove listeners in a different scope than the one in which the listener was added, this will eventually force you to declare global variables or class properties that will open your application to mutations.

1. If you check the code again, you'll realize that we now have a few more steps in order to execute the function and add the listener, this is probably not a big problem for you because we're getting a performance boost, but the cognitive load is something to take into account.

*Now, what if I tell you there is an alternative where you don't have to worry about these problems previously mentioned either?*

## MediaQuerySensor, a powerful and lightweight solution to the rescue
![](/images/2018-10-31-MQS-demo-image.gif)
[This demo page is available here](https://enmascript.com/code/mediaquerysensor).

[MediaQuerySensor (MQS)](https://enmascript.com/code/mediaquerysensor) is a library that creates a wrapper around `matchMedia`, it takes care of all the extra responsibilities so that you can focus on what matters, you only have to specify a reference id to identify your listener, the media query breakpoint and an action to execute for the given media query, with this data it'll then create what we call a _sensor object_ that allows you to remove and verify the listener added from anywhere in your code, without having to worry about contexts, references, boilerplate and validations, Woohoo!

Let's see a code example that demonstrates how to add a listener/sensor (taken from the [documentation](https://github.com/enmanuelduran/mediaquerysensor)):

```javascript
const consoleLogger = () => console.log('Between 480px and 990px');

MQS.add({
    ref: 'uniqueId',
    mediaQuery: '(min-width: 480px) and (max-width: 990px)',
    action: consoleLogger
});
```

That's it, you don't need to do anything else, you can add, remove and check sensors at will, here are some other functions available through MQS's API:

```
// Removes individual listeners, in this case the one with ref "uniqueId"
MQS.remove('uniqueId');

// Removes all the listeners
MQS.empty();

// Shows an object with all the active sensors/listeners
MQS.get();

// Shows the sensor object with ref "uniqueId"
MQS.get()['uniqueId'];
```

As you see, we're only defining the things that matter and we have a very complete and concise API to our disposal that will allow us to fulfill our needs.

I hope this article was helpful to you, maybe you even identified some places in your code base where you could improve, if you enjoyed the article, please, share it with your friends and teammates, if you have something you want to share or add you can do it in the comments below, you can find me on twitter with [@duranenmanuel](https://twitter.com/duranenmanuel) and my email is <duranenmanuel@gmail.com>.

See you in the next one dear developers of the future.

