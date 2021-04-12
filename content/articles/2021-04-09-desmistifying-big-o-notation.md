---
date: '2021-04-09T08:10:30.962Z'
title: 'Understanding Big O Notation'
summary: "Big O notation allows us to evaluate the performance of algorithms so that we can determine their efficiency and make decisions based on this determinations, let's try to understand how this notation works and how we can apply it in our lives as software developers."
series: ['Data Structures and Algorithms']
featuredImage: '2021-04-07-linked-lists.png'
---

## Definition

There are multiple ways of writing algorithms and so we need a way to understand how they perform under different ocassions to determine which one works better based on our needs. <mark>**Big O** is a notatiaon that allows us to evaluate growth rates by analyzing how the **time complexity** (Time of execution) and **space complexity** (memory usage) scale for a given algorithm when larger input sizes are processed by it.

## Understanding Time Complexities

### Constant Time O(1)

Constant time or O(1) makes reference to an algorithm that no matter the input size it will always take the same amount of time to perform a task, in example a function that validates if the first element of an array is a number:

```javascript
function isFirstElementNumeric(list) {
    return typeof list[0] === 'number';
}
```

No matter how large the input size is (the list's length) because we will only evaluate the first element, so, even if the list has 1k elements it will take the same as if the list had only 1 element.

![](/images/complexity-o1.svg)