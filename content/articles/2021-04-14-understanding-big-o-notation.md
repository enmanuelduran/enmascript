---
date: '2021-04-14T08:10:30.962Z'
title: 'Understanding Big O Notation'
summary: "Big O notation allows us to evaluate the performance of algorithms so that we can determine their efficiency and make decisions based on this determinations, let's try to understand how this notation works and how we can apply it in our lives as software developers."
series: ['Data Structures and Algorithms']
featuredImage: '2021-04-07-linked-lists.png'
---

## Definition

There are multiple ways of writing algorithms and so we need a way to understand how they perform under different ocassions to determine which one works better based on our needs. <mark>**Big O** is a notatiaon that allows us to evaluate growth rates by analyzing how the **time complexity** (Time of execution) and **space complexity** (memory usage) scale for a given algorithm when larger input sizes are processed by it.

## Understanding Time Complexities

### Constant Time

Constant time or $O(1)$ makes reference to an algorithm that no matter the input size it will always take the same amount of time to perform a task (therefore it is constant throughout time when the input size grows), in example a function that validates if the first element of an array is a number:

```javascript
function isFirstElementNumeric(list) {
    return typeof list[0] === 'number';
}
```

No matter how large the input size is (the list's length) because we will only evaluate the first element, so, even if the list has 1k elements it will take the same as if the list had only 1 element.

![](/images/o(1).svg#image-type=no-border;width=auto)

### Logarithmic Time

Also known as $O(log(n))$, As the name specifies, we determine logarithmic time when a algorithm runs in a time that is proportional to the logarithm of the input size as it size grows.

So for example:

1. log(1) = 0
2. log(2) = ~0.301
3. log(3) = ~0.477

and so on... As you can see the grow rate is still small and not linear. Usually we are able to identify an algorithm that is $O(log(n))$ because it will divide itself in smaller and smaller pieces with each iteration or operation, the simplest example I can think of is the following:

```javascript
let i = 1;

while (i < 10000000) {
    i = Math.pow(i, 3);
    console.log(i)
}
```

With each iteration the value of `i` will _exponentially_ increase because we are raising `i` to the power of 2 for each `i` iterated (you might be thinking "wait, exponentially?, aren't we talking about logarithmic time here?") yes, this is true but something important to notice is that <mark>logarithmic growth is the inverse of exponential growth</mark> meaning that if the loop's variable condition is increasing exponentially then the number of executions needed by the loop to finish decreases logarithmically, hence the runtime is logarithmic.

![](/images/o(log(n)).svg#image-type=no-border;width=auto)

### Linear Time

An algorithm has a linear $O(n)$ time complexity when it grows proportionally to the input, in other words when the grow rate is fixed when iterating over each input given:

```javascript
const n = 100;

for (let i = 0; i < n; i++) {
    console.log(i);
}
```

In the for loop above we need to iterate over _each_ value until `i < n` is not longer true, if `n` is a higher value we will have to iterate as many times as needed again until `i` reaches a value `>= n` and this is true of any `n` for this algorithm, as you can notice in linear time the correlation of the input size with the runtime is clear, if we increase `n` by a factor of 2 we already know that we will have to iterate twice as many times as before, if we compare this with logaritmic time complexity we will notice that logaritmic time is a bit more ambiguous, still it is worth noting that logarithmic time is more efficient than linear because logarithmic time grows at a slower rate (due to the partitioning that happens through each iteration, thing that does not happen in linear time).

![](/images/o(n).svg#image-type=no-border;width=auto)

### Linearithmic time

Linearithmic time complexity is a combination of linear time and logarithmic time hence $O(n \cdot log(n))$

A simple way to explain it in code could be mixing up both algorithms we used before to describe both linear and logarithmic time:

```javascript
let j = 1;

for (let i = 0; i < n; i++) {
    while (j < 10000000) {
        j = Math.pow(j, 3);

        console.log(j)
    }
}
```

We are executing the first loop in linear time and the second executes in logarithmic time which gives us $O(n \cdot log(n))$, another good example to represent this type of complexity is the merge sort algorithm which I will explain in more detail in another article.


![](/images/o(nlog(n)).svg#image-type=no-border;width=auto)

### Cuadratic Time

An algorithm is cuadratic time $O(n^2)$ when it grows proportionally to the squared value of the input given so:


- For $1$ we define $1^2 = 1$
- For $2$ we define $2^2 = 4$
- For $3$ we define $3^2 = 9$

and so on...

a good example of this type is when we are dealing with nested loops (one level of nesting), it does not mean that all nested loops are cuadratic by any means, and I will explain this better below, but a typical case could be the next one.

```javascript{4-10}
const list = [1,2,3,4,3,5,3,6,7,2,3];
let total = 0;

for (let i = 0; i < list.length; i++) {
    total += i;

    for (let j = 0; j < list.length; j++){
        total += j;
    }
}

console.log(total);
```

![](/images/o(n2).svg#image-type=no-border;width=auto)

### Exponential Time

Also known as $O(a^n)$ where a is a constant and n is variable.

A simple example I can think of that takes **exponential** time is recursive fibonacci without memoization (If you don't know what memoization is take a look at one of my previous articles _[Avoid recomputing heavy tasks by leveraging memoization in javascript](/articles/2019/04/22/avoid-recomputing-heavy-tasks-by-leveraging-memoization-in-javascript)_).

let's take a look at the code:

```javascript{6}
function fibonacci(num) {
    if (num <= 1) {
        return 1;
    }

    return fibonacci(num - 1) + fibonacci(num - 2);
}
```

so why is it exponential? I think it is useful to look at a visualization to understand what is happening here:

![](/images/2021-04-26-fibonacci.png#image-type=no-border;width=auto)

For each new function call the function doubles the previous amount of executions.

![](/images/o(nn).svg#image-type=no-border;width=auto)

### Factorial Time

Factorial time $O(n!)$ is not an indicator of good performance but sometimes we can't really do better than that, to put you in to context let's remember its definition: The factorial of a non-negative integer number $n$ is the product of all positive integers **_less than_** or **_equal to_** $n$.

so for example, the factorial of 4:

$$
4! = 4 \times 3 \times 2 \times 1
$$

A classic case scenario of this time complexity is the processing of every possible permutation of an array where $n$ is the size of the array and so it is $n!$ because we need to make all the permutations possible up to the length of $n$.


![](/images/o(nfactorial).svg#image-type=no-border;width=auto)

Factorial algorithm's code examples deserve their own article so I will dedicate a proper article to them.