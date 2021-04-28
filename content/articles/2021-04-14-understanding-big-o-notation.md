---
date: '2021-04-14T08:10:30.962Z'
title: 'Understanding Big O Notation'
summary: "Big O notation allows us to evaluate the performance of algorithms so that we can determine their efficiency and make decisions based on this determinations, let's try to understand how this notation works and how we can apply it in our lives as software developers."
series: ['Data Structures and Algorithms']
featuredImage: '2021-04-07-linked-lists.png'
---

**Big O**, a highly popular notation that is often heard in the world of algorithms, performance and optimization, it is a hot topic for coding interviews in big companies such as Google, Amazon, Facebook... everybody says you should learn about it, but why? why would you or anyone learn about Big O if you are not taking interviews? In this article I will try to explain from my perspective about why it is useful and how you can apply it in your everyday basis to make you improve in your next implementations and code reviews.

## Definition

There are multiple ways of writing algorithms, you can implement a feature in many different ways, everybody has a unique way of thinking and solving their way through problems, for this reason we need a way to understand how this different solutions perform under different scenarios to help us determine which one works better based on our needs, <mark>**Big O** is a notatiaon that allows us to evaluate this, specifically it allows us to evaluate growth rates by analyzing how the **time complexity** (Time of execution) and **space complexity** (memory usage) scale for a given algorithm when larger input sizes are processed by it</mark>.

For a formal definition of Big O I would recommend you to read [the one from wikipedia](https://en.wikipedia.org/wiki/Big_O_notation#Formal_definition) which is actually pretty straight forward, if you have trouble understanding the formal definition **do not worry**, it is enough to understand the intuitive definition highlighted above.

## Understanding How to Evaluate Complexities

To understand how to evaluate an algorithm or a piece of code we need to separate it in statements or operations and we need to understand how each of these affect the algorithm.

Let's define some important concepts before proceeding:

1. **Complexity** and **Performance** are two different things, The former specifies how the required resources for a program scale and the latter specifies how much of those resources is used taking into consideration the environment (the machine) in which an algorithm is running, the code, the time... So Complexity affects Performance but this is unidirectional, performance _does not_ affect complexity.

2. **Statements** are the units or simple instructions executed in a program in order to perform an action, they could in example:
    - Defining a variable `let a = 1;`
    - Making an arithmetic operation `3 + 2`
    - A Function call `fn()`

There are also **Compound Statements** which contain more than one instruction or operation, one example is: `for (let i = 0; i < 10; i++) {}` which is executing a loop but at the same time defining a variable `i`, making a comparison `i < 10` and incrementing the variable `i` by 1 in each iteration.

The idea is that you understand that <mark>programs are a conjunction of **statements** that determine their **complexity**</mark>.

Finally two more concepts, as previously mentioned there are two types of complexities relevant to Big O:

3. **Time Complexity** evaluates how an algorithm will scale over time, helping us understand if it will be too slow or will be fast enough for our needs.

4. **Space Complexity** evaluates how an algorithm makes use of space over its execution, in example, how many variables we are defining, how an array or object grows to ensure that we will not cause any issues with memory consumption given our needs...

### Constant

Constant or $O(1)$ Complexity makes reference to an algorithm that no matter the input size it will always take the same amount of time/space to perform a task (therefore it is constant when the input size grows), in example let's evaluate a function that validates if the first element of an array is a number:

```javascript
function isFirstElementNumeric(list) {
    return typeof list[0] === 'number';
}
```

If we evaluate this by statements we understand that:

- **Line 1:** We are creating a function called `isFirstElementNumeric`
- **Line 1:** We are creating a variable called `list` to hold the input.
- **Line 2:** We are returning a value
- **Line 2:** We are getting the `typeof list[0]`
- **Line 2:** We are making a comparison against `number`

Notice how I have separated the lines into multiple statements, one line can have multiple statements, and some of those statements can be native implementations of the language like in this case when `typeof` is used, and this is important to understand, the inner implementation of native functionalities affects the complexity of an algorithm depending on how it is implemented by the language, so if you are evaluating an algorithm, you need to be careful to understand and account for the complexity of the inner works of the language.

If we evaluate the Time Complexity of the previous algorithm knowing the concept of _constant_ we can determine that each statement is $O(1)$, why? because for all the statements of this function no matter how big the input is, it will always take the same amount of time to evaluate every statement of the function, because in this case even if the array has 1000 elements we are just taking index 0 and same goes for space, we are not defining new variables when executing this function, **and this next part is important**, yes, we are using a variable `list` to hold the input but <mark>when evaluating space complexity we don't take into consideration the input itself because that is the very premise upon which the algorithm evaluation itself is based on, if we took the input into consideration then for any function receiving a data structure capable of storing multiple properties it would be at least linear time</mark> (We will explain linear time in a bit).

The graph below represents how time complexity (Y Axis) gets affected when the input size (X Axis) grows, since time is constant time remains unchanged for any given input size.

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
    i = i * 2;
    console.log(i)
}
```

With each iteration the value of `i` will _exponentially_ increase because we are multiplying `i` by 2 and in the next iteration the result * 2 and so on (you might be thinking "wait, exponentially?, aren't we talking about logarithmic time here?") yes, this is true but something important to notice is that <mark>logarithmic growth is the inverse of exponential growth</mark> meaning that if the loop's variable condition is increasing exponentially then the number of executions needed by the loop to finish decreases logarithmically, hence the runtime is logarithmic.

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

Linearithmic algorithms are slower than $O(n)$ algorithms but still better than cuadratic time algorithms, they are usually found in sorting algorithms such as Merge Sort and Heap Sort both of which we will see in another article.


![](/images/o(nlog(n)).svg#image-type=no-border;width=auto)

### Cuadratic Time

An algorithm is cuadratic time $O(n^2)$ when it grows proportionally to the squared value of the input given so:


- For $1$ we define $1^2 = 1$
- For $2$ we define $2^2 = 4$
- For $3$ we define $3^2 = 9$

and so on... visually speaking cuadratic time would look something like this:

![](/images/o(n2).svg#image-type=no-border;width=auto)

a good example of this type is when we are dealing with nested loops (one level of nesting), it does not mean that all nested loops are cuadratic by any means, and I will explain this better below, but a typical case could be the next one.

```javascript{4-10}
const list = [1,2,3];
let total = 0;

for (let i = 0; i < list.length; i++) {
    total += i;

    for (let j = 0; j < list.length; j++){
        total += j;
    }
}

console.log(total);
```

We have an outer loop that executes up to $n$ times where $n = 3$ (the length of `list`), inside of that loop we have another one that is doing the same thing, which means that for each element on the parent loop we are executing $n$ times the inner loop, so basically $n \times n$:

![](/images/2021-04-n2.svg#image-type=no-border;width=auto)

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