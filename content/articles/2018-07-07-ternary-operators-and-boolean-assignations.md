---
date: '2018-07-07T17:12:33.962Z'
title: 'Ternary operators and boolean assignations'
summary: 'Ternary operators are a great way to improve the readability and simplicity of your code but they can be easily misunderstood, learn more about it...'
series: ['Javascript']
featuredImage: '2018-07-07-ternary-operators.png'
---

Hey developers of the future, welcome, in this article I'm going to help you improve your coding technique by teaching you how to use ternary operators, I'm also going to explain to you why it is good and when you should and shoudln't use it so let's get started.

## Ternary Operator

I know I know, “ternary operator” sounds fancy and complicated, but believe me, this time the name makes a lot of sense and it’s not hard to understand at all, let’s take some time and analyze it a bit.

It’s called _Ternary_ Operator because it’s composed of _three_ arguments, the first one is a comparison/conditional argument, the second one is what happens when the conditional argument evaluates to _true_ and the third one is what happens when it evaluates to _false_, you can think of ternary operators like a short way of writing conditional statements, here is how to implement it:

```javascript
Conditional_Argument ? True_Argument : False_Argument;
```

Very simple right?, now a more realistic example:

```javascript
1 + 1 === 2 ? 'Correct' : 'Incorrect';
```

In the example above we’re evaluating the super complicated expression 1 + 1 === 2, in case this is true (which it is of course) it would return the string `Correct`, if it was false it would have returned `Incorrect`, easy, now let me show you when it really comes in handy.

Give `age` a number and suppose we have a variable `canDrive` that needs to be defined based on a condition (Something that happens all the time in real-world applications):

```javascript
let canDrive;

if (age >= 18) {
    canDrive = 'Yes';
} else {
    canDrive = 'No';
}

console.log(canDrive);
```

A very simple condition but still feels redundant, we’re declaring a variable out of the if statement, we’re defining its value based on the if conditional so we’re repeating it for the _if_ and the _else_ case, hmm… there has to be a better way, let’s now see the ternary operator do this exact same thing:

```javascript
const canDrive = age >= 18 ? 'Yes' : 'No'; // parenthesis are optional
console.log(canDrive);
```

Wait, what?, one line?, Holy CSS Sheet…

Let me explain why this is so good, I can think of at least 3 things right away:

1.  in the first example using the _if_ statement we had to declare `canDrive` using _let_ because we needed to _console.log_ the value out of the _if’s_ _block-scope_ (Don’t know what _block-scope_ means?, read [this article](https://enmascript.com/articles/2018/07/06/const-let-and-var) where I explain it better), in the Ternary Operator’s case we were able to use _const_ because the variable is not limited by any block, which means we have _more flexibility_.
2.  _Less redundant_, look at the if’s statement case again and check how many times do you see the `canDrive` variable named?, 3 times right?, now look at the Ternary Operator implementation, just once…
3.  _Fewer lines, Easy and faster to read_.

In the explanation above I didn’t mention that the Ternary Operator’s implementation is cleaner (and most importantly, it makes you feel _badass_ the first times you use it).

**Recommendations:** When you get used to writing code with ternary operators it’s very easy to write bad code just because “it has fewer lines of code”, to avoid making these mistakes I recommend you to:

-   **Use parenthesis to differentiate arguments when they look confusing.**Notice how in the example we were analyzing before I made use of parenthesis around the _conditional argument,_ the reason why I did it is to avoid the visual confusion of having the operators `=` and `>=` too close together, so, as a general rule, if you’re using operators that make a statement uncomfortable to read then use parenthesis.
-   **Don’t over-complicate just for the sake of writing ternary operators.** Learn how to identify if using it is a wise choice, many times using the classic if statement is better.

Ok, now, for the end, I’m gonna push your logic one step further and I’m gonna try to help you understand that programming is all about abstraction. What would happen if the `canDrive` variable that we saw before had assigned a boolean (`true` or `false)` instead of the strings `'Yes'` or `'No'`, I mean something like:

```javascript
const canDrive = age >= 18 ? true : false;
```

looks good right?, but wait… now look at this:

```javascript
const canDrive = age >= 18;
```

Wouldn’t this have the same result?, the answer is YES, why?, because the value being assigned is the result of a boolean evaluation which can only end up either in `true` or `false` depending on the result of the condition, this is something I’m pretty sure most of you already knew, but still wanted to show this example and say: Yes, there are many things in a programming language that can help us write better and concise code, but what matters the most at the end is our capacity to reason about problems, so first take your time to analyze them and then use the things you’ve learned alongside with your logic, I’m pretty sure you’ll write great code after that.

I Hope that you have enjoyed this article, if that was the case please share it and comment on twitter or facebook if you want to contribute with anything related to this topic, thank you guys, see you in the next one.
