---
date: '2019-06-04T17:10:30.962Z'
title: "Code quality and web performance, the myths, the do's and the don'ts"
summary: "Performance optimizations are sometimes mistakenly executed, in this article we will explain some of the most common mistakes we make when we want to optimize an application, we will also go through alternatives a good ideas to take into consideration when applying optimization in our codebase."
series: ['Javascript', 'Performance']
featuredImage: '2019-06-04-webperf-code-quality-cover.png'
---

Optimization is a word that englobes a significant scope of possibilities, especially in the world of software development. Developers always like to "optimize," but what is it _really_? -- This word is many times miss-used to excuse subjective point of views, other times it is used only to demonstrate "improvements" that are not sincerely necessary. In this article, we are going to be talking about the mistakes we make as developers when trying to improve our code bases by "optimizing" them, and, we are going to see which are some excellent ways to start doing this correctly.

## Always measure first, quantify, and please... don't just blindly "optimize".

A fundamental lesson that we as software developer learn with the years is that **numbers matter**, _something is impactful if you have a way of quantifying the co-relation between the effort you have applied to it and the results it has given_.

For example, there is a common belief that lines of code are somehow inversely related to higher performance or better quality.

![](/images/2019-06-03-common-belief.jpeg)

_Usually_ having less code means less surface area to cover, which means, more clarity and less possibility of bugs. However, this only applies if you have a "high quality" code base that is secure, consistent and is using the right tools for the right job.


Let me elaborate a little bit, take the following piece of code:

```javascript
const mainWrapper = document.querySelector('.wrapper');


if (mainWrapper) {
    const element = document.querySelector('.inner-box');

    element.classList.add(enabledInteractionClass);
    mainWrapper.classList.remove(enabledInteractionClass);
}
```

There is nothing wrong with the code above. It just has an extra couple of variables to make the code more declarative. I have seen code reviews where people convert this implementation to:

```javascript
const mainWrapper = document.querySelector('.wrapper');
let enabledInteractionClass = 'enabled-box';

const enabledElementClass = mainWrapper
    ? document.querySelector('.inner-elm').classList.add(enabledInteractionClass)
    : mainWrapper.classList.add(enabledInteractionClass);
```

Then, the argument comes where a developer says, "we can avoid the extra variable for `document.querySelector('.inner-elm')`" and he/she calls this an optimization, your answer is that you like it more the first way because it is more declarative in comparison, and you spent 5 mins discussing this. What the code reviewer does not realize is that he is now defining `enabledInteractionClass` all the time, and he is using the variable `enabledElementClass` for something that does not require it, so where is the improvement? Was this a decision based on a solid foundation? How does this code make the codebase better? is it measurable?

**Disclaimer**: I'm in favor of well constructed/used ternary operators and [short-circuiting](https://enmascript.com/articles/2018/07/09/short-circuiting-for-faster-evaluations), this example just shows how _NOT_ to use a tool just for the sake of less lines of code or to defend a subjective point of view.

## There is a term for worthless micro-optimizations that end up in a waste of time.

<mark>_Bikeshedding_ is the art of wasting time by having technical disputes over minor, marginal issues, issues that won't have a real positive impact in your work while there are more important things to look at.</mark> So, the next time someone wants to argue over insignificant improvements, just say the word _bikeshedding_. The etymology for this term can be found on [wiktionary.org](https://en.wiktionary.org/wiki/bikeshedding#English) and [urbandictionary has another good definition for it](https://www.urbandictionary.com/define.php?term=bikeshedding).

The point being, micro-optimizations are something you should avoid doing without basis, if you want to optimize some code, measure and identify bottlenecks first.

## Measure first

Suppose your website/application is a little bit slow when you scroll, don't just go and increase the `throttle` time for your listener and mark it as _done_, analyze what is going on and understand what the reason behind this issue is. A way to measure scroll performance is through _Frames Per Second (FPS)_, so you know you have a quantifiable way to understand what is happening and a starting point.

### Let's see a good way to tackle this problem

1. First, check if the code/tasks executed on the scroll are doing what they suppose to be doing, scroll junkiness could be caused by memory leaks.
1. If the code is wrong, fix it, if it is ok look at your alternatives:
    - Can we use `IntersectionObserver` instead of the scroll event?
    - Is `throttle` needed? can we `debounce` it?
1. If after looking at your alternatives you don't see any other option then as a last resource _consider_ increasing the `throttle` time.

Why to go through all this trouble instead of just increasing the time? because nothing ensures you that after increasing the time it won't happen again, or even worst, nothing ensures that there is not a more important issue underneath.

This is just an example applied to scroll performance, but the same principle can be applied over any other circumstance by having the correct metric to measure.

## Improve the quality of your code base
Some of the most common ways of optimizing code bases are linters, if you use javascript [ESLint](https://eslint.org/) is a good one -- As for your styles, you could use [Stylelint](https://stylelint.io/). You can later add these two elements as required steps in your build process to create an extra layer of consistency, linters are a good way to promote consistency in your code base.

Nevertheless, <mark>linters alone are not going to guarantee the quality of your code base</mark>, it heavily depends on the level of your team, you have to be aware of this before trying to push things too hard. Some recommendations to start increasing the quality of your codebase are:

1. **Promote design patterns**. (We have written about some of them, i.e [Observer Pattern](https://enmascript.com/articles/2019/03/09/diving-into-the-great-observer-pattern-in-javascript), [Factory Pattern](https://enmascript.com/articles/2018/10/05/javascript-factory-pattern), [Builder](https://enmascript.com/articles/2019/03/18/building-objects-progressively-with-the-builder-pattern-in-javascript)) you don't have to use these explicitly, remember, the idea is to use the right tool for the right job, design patterns are not always the best option, but they are for sure a way of adding consistency and security to your application.

1. **Pairing Sessions / Brainstorming.** Some hugely underestimated and yet powerful tools are communication and teamwork, make sure the team communicates their ideas before implementing them at least with one other person, this ensures that the knowledge spreads, more people gets involved and gives their opinion. Together you will find a more solid approach to solve a problem and you will avoid the fatigue of rejected pull requests, a couple of good ways to promote team communication are [Katas](https://en.wikipedia.org/wiki/Kata_(programming)) and [RFC's](https://en.wikipedia.org/wiki/Request_for_Comments).

1. **Your future self matters**. When you write code or make a code review, think in your future self, what would happen tomorrow if you had to scale your module? I like to follow the _DIRTFT (Do It Right The First Time)_ principle, this is certainly not easy to do, even today I don't get to write the best possible code I can when I do it the first time, but I iterate over it until I get to a place where I feel comfortable with it.

1. **Think before you code**. Create a model about what you have to do, understand what is needed and the alternatives you have, never start writing code right away before analyzing the implementation.

1. **Care about data structures and time/space complexity**. This point requires deeper knowledge on **how** algorithms work and **why**. I have personally noticed that the more experienced the team is the more they care about this, in the frontend world there is a miss-conception that data structures/time space complexity does not matter as much, but this is a mistake, these tools allow you to write scalable/performant modules, it is part of choosing the right tool for the right job.

There is not a fixed formula for _code quality_, this is a progressive and subjective topic, it highly depends on the requirements of the company you are working on and your team. One last recommendation I could give you is to **cosider promoting declarative code**, give attention to the readability.

## Recommendations, tips and good practices to optimize your site (Performance):
One excellent way to measure your site's performance is through the [RAIL model](https://developers.google.com/web/fundamentals/performance/rail). Below I have a list of some common problems that websites confront and some possible tools that could help you solve them, this list is not meant to solve your problems directly but to point you in the right direction:

#### Unused code
- **Impact metric**: Bytes / Download time
- **Helpful tools**: [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer), [Chrome Coverage](https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage)
- **possible solutions**: [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)

#### Scroll Junk
- **Impact metric**: Frames Per Second (FPS) / Page Interaction
- **Helpful tools**: [Chrome's FPS meter](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference#fps-meter), [Chrome's FPS Chart](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference#fps-chart), [Chrome's Frames Section](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference#frames)
- **possible solutions**: [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), [Throttling](https://enmascript.com/articles/2019/02/27/higher-order-functions-and-some-great-applications-in-javascript#throttler), [Debouncing](https://lodash.com/docs/4.17.11#debounce)

#### Heavy/Slow Animations
- **Impact metric**: Frames Per Second (FPS) / UI / UX
- **Helpful tools**: [Same as Scroll Junk](#scroll-junk)
- **possible solutions**: [CSS will-change property](
https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
), [Use properties that are processed by the GPU](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)

#### Elevated Number of Network Requests
- **Impact metric**: Seconds/Milliseconds _Load Time_ / Application Response Time
- **Helpful tools**: [Memoizer](https://enmascript.com/articles/2019/04/22/avoid-recomputing-heavy-tasks-by-leveraging-memoization-in-javascript#a-better-implementation), [Redis](https://redis.io/)
- **possible solutions**: [Memoization](https://enmascript.com/articles/2019/04/22/avoid-recomputing-heavy-tasks-by-leveraging-memoization-in-javascript), [Caching ](https://en.wikipedia.org/wiki/Cache_(computing))

#### Memory Leaks
- **Impact metric**: Bytes / Browsers Memory
- **Helpful tools**: [Chrome's Heap Snapshot](https://developers.google.com/web/tools/chrome-devtools/memory-problems/heap-snapshots)
- **possible solutions**: [Closures](https://www.w3schools.com/js/js_function_closures.asp), [Remove dettached DOM nodes](https://developers.google.com/web/tools/chrome-devtools/memory-problems/#discover_detached_dom_tree_memory_leaks_with_heap_snapshots)

#### Extra tools
There are many other metrics and important optimizations you can make, it is impossible to fit them all in a list but the tools below are a big help as far as web optimization is concerned:
- [LightHouse](https://developers.google.com/web/tools/lighthouse/)
- [webpagetest.org](https://www.webpagetest.org/)

## This is just a starting point
The path to web performance and code quality is long, it is not straightforward in most of the cases, there are some things that you only learn from experience. This article is meant to be a starting point for those who are looking for directions but don't know where to start or how to start.

Hope you have enjoyed this article, see you in the next one!


