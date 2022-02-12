---
date: '2019-09-22T10:10:30.962Z'
title: 'A different way of handling required arguments in javascript functions'
summary: 'Required parameters are everywhere in our codebase, in this short article we are going to explore a different way of handling them that might just be your new favorite approach.'
series: ['Did You Know']
featuredImage: '2019-09-22-required-function-arguments.png'
reddit: 'https://www.reddit.com/r/javascript/comments/d7pvw7/a_different_way_of_handling_required_arguments_in/'
leenker: 'https://leenker.com/leenk/17099/a-different-way-of-handling-required-arguments-in-javascript-functions'
---

<mark>**#Did you know** is a new series of Enmascript where we write short and concise explanations about topics we consider might be relevant or underestimated, if you are looking for more complete in-depth articles check out our **[other series](/series)**.</mark>

_Usually_ in javascript if you want to validate required arguments, you would do something similar to this:

```javascript{2,3,4}
function Person(water, food, candy) {
    if (!water || !food) {
        throw new Error('water and food are required for Person');
    }

    // Do something with water and food...
}
```

The constructor `Person` Above would throw an error if no `water` or `food` is supplied, this is a relatively common and popular way of validating parameters, but there is a different more functional way to achieve this.

Create a helper function that throws an error:

```javascript
const required = name => {
    throw new Error(`Parameter ${name} is required`);
};
```

In the case above we are passing an argument `name` to the function because it feels more natural to print the name of the parameter that is required.

Then we use it like this:

```javascript{2,3}
function Person(
    water = required('water'),
    food = required('food'),
    candy
) {
    // Do something with water and food
}
```

**What is happening here? How does this validation work? It is very straight forward:**

If we don't pass the required parameter's values, the `required` function is executed throwing an error and forcing the user to pass each mandatory value everytime the function is invoked.

Passing the name of the parameter to the `required` function is only a preference; we can decide not to pass it and make the helper function simpler, it is a personal choice.

This approach is not limited to this implementation, we can use this same principle to create our own argument's validators and reuse in our functions to enforce consistency and security.

Do you have ideas that are similar or related to this topic? [share them with us](https://www.reddit.com/r/javascript/comments/d7pvw7/a_different_way_of_handling_required_arguments_in/).
