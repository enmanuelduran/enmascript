---
date: '2019-09-20T09:10:30.962Z'
title: 'Two exceptional use cases for the spread operator you may not know of'
summary: 'Spread operator is one of the most commonly used elements in the javascript toolbox, this mini-article will show you a couple of highly productive and efficient uses for the spread operator.'
series: ['Did You Know']
featuredImage: '2019-09-20-spread-operator-uses.png'
reddit: 'https://www.reddit.com/r/javascript/comments/cdgvs3/efficient_behavioral_tracking_in_javascript/'
---

<mark>**#Did you know** is a new series of Enmascript where we write short and concise explanations about topics we consider might be relevant or underestimated, if you are looking for more complete in-depth articles check out our **[other series](/series)**.</mark>

One of the most popular features used in javascript after Ecmascript 2015 is without question the spread operator. In this short "Did you know" article, we will explore a couple of exceptional use cases that we consider to be very useful but that are not so well known.

## Optional/Conditional Spreading

Add object properties and values based on a condition:

```javascript{5}
const isDog = true;

const obj = {
    key: 'value',
    ...(isDog && { woof: true })
};
```

In this way, we can add the `woof` property conditionally without having to use any if/else logic or similar approaches... **if the condition returns true, it will add the property, otherwise, the object will remain untouched**.

**result of `console.log(obj)`**

```javascript
{ key: 'value', woof: true };
```

## Copy objects and exclude selected properties

Let's say we like the parts of certain CPU and we would like to keep most of them except for the ssd, because of course, we would like to have more space:

```javascript{9}
// Original CPU
const CPU = {
    ram: '32gb',
    ssd: '64gb',
    micro: 'i7'
};

// new CPU copy without the 64GB ssd
const { ssd, ...newCPU } = CPU;
```

Now, if you console log `newCPU` you will see that it does not longer contain the `ssd` property, this happened because we excluded that property from the rest that were included in `newCPU` by leveraging the _rest operator_.

**result of `console.log(newCPU)`**

```javascript
{ ram: '16gb', micro: 'i7' };
```

Do you have any more relevant use cases for the spread operator you would like to comment about? go a head and do that on reddit or twitter in our social links.
