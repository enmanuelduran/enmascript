---
date: '2019-09-24T10:10:30.962Z'
title: '6 Things you probably did not know javascript could do natively'
summary: 'JavaScript is a language that evolves fast, for this reason it is sometimes hard to catch up with all its features and capabilities. On this short article we will explore some of the features that you may not know existed.'
series: ['Did You Know', 'Javascript']
featuredImage: '2019-09-24-required-function-arguments.png'
---

<mark>**#Did you know** is a new series of Enmascript where we write short and concise explanations about topics we consider might be relevant or underestimated, if you are looking for more complete in-depth articles check out our **[other series](/series)**.</mark>

JavaScript is a language that evolves fast; for this reason, it is sometimes hard to catch up with all its features and capabilities. On this short article, we will explore some of the features that you may not know existed.

## Getting query string parameters
`URLSearchParams` is an interface that allows us to process query string parameters, it's been around for some years now but it might surprise you to know that it is not that popular between developers, let's see how to use it:

```javascript{2,4,5}
// to get the query strings from the current url use window.location.search
const queryStrings = new URLSearchParams('?browser=chrome&action=redirect');

queryStrings.get('browser');
queryStrings.has('action');
```

Simple enough, [here](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) more information about the complete API, in case you are interested in the complete functionality.

## Create a unique list of elements using the Set object
Creating unique lists in javascript is a common task, this is usually achieved by applying filters or for loops, but there is another way to accomplish this leveraging the `Set` object.

```javascript{3}
const list = [1,2,3,5,2,5,7];

const uniqueList = [...new Set(list)];
```

We pass the array of primitive values to the `Set` object; it creates a collection of unique values which is then converted to a _list_ using the spread operator syntax and array literals.

## Cast a list of primitive values to a different type
Sometimes endpoints or processed data from the DOM doesn't return the type of values we need, I have seen this especially happening when processing dataset properties. Let's say we have the following list:

```javascript
const naiveList = ['1500', '1350', '4580'];
```

We want to execute a sum of all the elements in the array, in JavaScript if you "sum" two strings like `'1' + '2'` they will concatenate, generally, to solve this we would leverage the `parseInt` function, but there is another way; We can cast the elements in the array to the type of primitive we need:

```
const castedList = naiveList.map(Number);
```

`castedList` now contains the values with the correct `Number` type.

## Flatten nested array values
With the rise of Single Page Applications architectures such as Redux and concepts like frontend data normalization became more popular, part of this "data normalization" trend sometimes implies having all the ids of elements listed at the same level.

Let's say we have the following list and we want to flatten it:

```javascript
const nestedList = [133,235,515,[513,15]];

const flattenList = nestedList.flat()
```

and just like that our array of ids is now flattened.

## Avoid object mutations with Object.freeze
When talking about functional code, one of the things that I have been asked the most is how to stop objects from mutating, the answer to this question is always the same _Freeze_ them:

```javascript{6}
const immutableObject = {
    name: 'Enmascript',
    url: 'https://enmascript.com'
};

Object.freeze(immutableObject);

immutableObject.twitter = 'https://twitter.com/duranenmanuel';
immutableObject.name = 'Another name';

// immutableObject is still { name: "Enmascript", url: "https://enmascript.com" }
```

## Created Controlled objects with Object.seal
Does the same as `Object.freeze` but it allows you to change the values of properties that were already defined in the object, this will enable you to _control _the properties declared in an object but not the definitions:

```javascript
const controlledObject = {
    name: 'Barry Allen'
};

Object.seal(controlledObject);

controlledObject.name = 'Clark Kent';
controlledObject.hero = 'Superman';

// controlledObject will return { name: "Clark Kent" }
```

Do you know of any other javascript features that may not be popular but useful? share them with us.
