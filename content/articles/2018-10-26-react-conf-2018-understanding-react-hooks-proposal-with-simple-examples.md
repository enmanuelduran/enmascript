---
date: "2018-10-26T04:30:23.912Z"
title: "React Conf 2018: Understanding React's hooks proposal with simple examples"
summary: "React Hooks are the future, a new way of building react components to interact with state is here"
series: ["React"]
featuredImage: "2018-10-26-hooks-proposal.png"
---

Yesterday was the first day of the [React conf](https://conf.reactjs.org/), the community is very excited about the things that are happening with react (myself included), after watching some minutes of the conference we noticed a pattern, the word _hooks_ started to be recurrent, and the more it was used the more amazed and hyped we were. In this article, we're going to be explaining how _hooks_ work a little bit by identifying some key concepts and understanding a simple example of a counter that will be progressively evolving with the use of the different hooks (Ah, and you'll be reading the word _hooks_ a lot). Grab a soda, fasten your seatbelt and enjoy the ride.

![](/images/2018-10-26-hooks-proposal.png)

[React Hooks](https://reactjs.org/docs/hooks-intro.html) are a new proposal available in the version 16.7.0-alpha of React and is currently being discussed in [this RFC](https://github.com/reactjs/rfcs/pull/68). Basically with the introduction of _hooks_ you are no longer being forced to use _classes_ just to be able to make use of react core features such as the state, yes, you read that correctly, you can now manipulate the state by using a _function-based component_, let me show you what I'm talking about with our first codepen example, take a look, don't panic, and then I'll explain what is going on, I promise, please don't panic:

<iframe height='265' scrolling='no' title='LgMomz' src='//codepen.io/enmanuelduran/embed/LgMomz/?height=265&theme-id=0&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/enmanuelduran/pen/LgMomz/'>LgMomz</a> by Enmanuel Durán (<a href='https://codepen.io/enmanuelduran'>@enmanuelduran</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

I know, you're probably thinking: where is the `setState` call? where is my initial `state` property? is this real life? - the answers to these questions are very simple, we don't need the setState call nor the initial state property and yes, **this is real life**, we live in a world that's constantly changing and evolving (and to be honest, I love it).

## The useState Hook

```javascript
useState(initialState);
```

So, take a look at the code and check the beginning of the function, you see that `useState` call there? that ladies and gentlemen is a _hook_. [As defined in the official documentation](https://reactjs.org/docs/hooks-state.html#whats-a-hook), a _hook_ is a unique kind of function that allows us to "hook into" React features, it returns a pair representing the current state and a function that lets us update the state respectively, if you see the example, we're saving our current state in a variable called `count` and the update function in a variable called `setCount`, also notice how we're passing a `0` to `useState`, this is the initialization value that `count` will take. As you can see the initialization value can be different than an object on the contrary to `setState`, this also means that in case we wanted to update multiple types of values, the correct way to do it would be to call `useState` multiple times with the needed initialization values for each case.

### useState key concepts

1. It returns a pair, first returns the current state and second an updater function, you can easily assign these values by using [array destructuring](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment).
1. It receives the initial state value as an argument, it doesn't necessarily have to be an object, it could be a number or string, depending on what is needed.
1. To update multiple values, it's ok to call `useState` multiple times.
1. Updating a state variable with `useState` always replaces the previous state, this is a key difference when compared to `setState` that merges states.
1. It returns the same state value passed as an argument when the initial render happens.
1. If it's called after the initial render, the first value returned will be the most recent after the executed updates.

## The useContext Hook

```javascript
useContext(ContextObject)
```

Allows us to access the context without having to introduce nesting to our component, you can avoid wrapping it into a provider and instead use the `useContext` hook that receives the context object as an argument, so, here the key concepts:

### useContext key concepts

1. It basically lets you subscribe to React's context without any nesting required.
1. It receives a context object which is just the object returned from `React.createContext()`.
1. Triggers a rerender when the provider updates.

Here goes the same example of the counter but with an improved UI thanks to the `useContext` hook, check both code and the result:

<iframe height='265' scrolling='no' title='GYPVbM' src='//codepen.io/enmanuelduran/embed/GYPVbM/?height=265&theme-id=0&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/enmanuelduran/pen/GYPVbM/'>GYPVbM</a> by Enmanuel Durán (<a href='https://codepen.io/enmanuelduran'>@enmanuelduran</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Here we're just using the `useContext` hook to get the current theme and assign it to a variable, in this way we can access the properties (in this case the class property) and give some nice styling to our example.

## The useEffect Hook

```javascript
useEffect(() => {
    // Similar to componentDidMount
    // Subscribes, timers...

    return () => {
        // similar to componentWillUnmount
        // Clean subscriptions here.
    };
},
[FiringValues])
```

In the world of _hooks_, `useEffect` would be kind of the equivalent to what `componenDidMount` and `ComponentWillUnmount` combined are to a _class-based component_, in this hook is where you would usually handle side effects like mutations, subscriptions... and all the behaviors that could cause inconsistencies and unexpected errors in the interface. It runs after every completed render by default but you can make it fire only when some specified values change by passing a second parameter (array) to it. In case you want to clean up some subscriptions, you could do so by returning a function inside the first function passed to `useEffect`.

### useEffect key concepts

1. It Handles side effects, adds and cleans subscriptions.
1. Runs after every completed render, we can limit it to fire only after certain specified values change.
1. Receives two arguments, first a function and then an array of the values that will fire the hook.
1. Returns a function inside the first function passed to handle cases in which we want to clean up some side effects.

Now an example, we'll use this hook to cast the window's width and reset the counter every time the width of the screen changes, for this we'll add and remove some listeners, let's take a look.

<iframe height='265' scrolling='no' title='zmeOeZ' src='//codepen.io/enmanuelduran/embed/zmeOeZ/?height=265&theme-id=0&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/enmanuelduran/pen/zmeOeZ/'>zmeOeZ</a> by Enmanuel Durán (<a href='https://codepen.io/enmanuelduran'>@enmanuelduran</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Excellent, so, let's explain a little. Here we're adding an effect to add and remove a resize event listener, this listener allows us to perform two operations, first it helps us clean the counter everytime the width of the screen changes and second it lets us set the current width into a state variable called `width`, which is then used to show the current screen width.

## Custom Hooks

This one is very simple to explain, a custom hook is no more than a function that starts with the prefix _use_ and that could make use of other hooks:

### Custom hooks key concepts

1. It's a good place to abstract reusable logic.
1. Should start with the prefix _use_.
1. Since it's defined by us, the function can have a customized signature and return values.

Now let's see an example, I'll refactor the example created for `useEffect` so that we can reuse the logic that sets the width of the screen, the functionality will be the same, but the code will be more flexible.

<iframe height='265' scrolling='no' title='yRZLXM' src='//codepen.io/enmanuelduran/embed/yRZLXM/?height=265&theme-id=0&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/enmanuelduran/pen/yRZLXM/'>yRZLXM</a> by Enmanuel Durán (<a href='https://codepen.io/enmanuelduran'>@enmanuelduran</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Now, let's analyze what we did here step by step.

1. We're isolating the logic to set and get the width of the screen into a custom hook called `useWindowWidth`.
1. We're returning the screen width from our custom hook in order to make it reusable.
1. We're declaring a variable `width` to get the value returned by `useWindowWidth`.
1. We're creating another `useEffect` hook inside our counter component, this allows us to reset the counter only when the screen width changes, this is possible because we're passing the second parameter to `useEffect` which is the property that will decide when to fire the updater.

**Note:** Maybe Another approach to avoid having an effect inside the component could be to pass the `setCount` updater to the `useWindowWidth` hook as an argument, the reason why I didn't go for this is because it will mean that all the functions that want to use `useWindowWidth` later will need to have the `setCount` function defined and having this limitation didn't convince me.

Some extra information that you should know about _hooks_ is that [they follow some rules](https://reactjs.org/docs/hooks-rules.html) and that [there are many more to explore](https://reactjs.org/docs/hooks-reference.html).

**Boom!**, did you like this new feature proposal so far? I'm loving it, have some fun playing around as I did and let me know in the comments if you enjoyed this article, as always you know you can contribute to the site on [GitHub](https://github.com/enmanuelduran/enmascript) by sending a pull request, also, you can find me on twitter [@duranenmanuel](https://twitter.com/duranenmanuel) or email me at <duranenmanuel@gmail.com>.

See you in the next one developers of the future!
