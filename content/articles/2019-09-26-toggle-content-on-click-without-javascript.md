---
date: '2019-09-26T08:10:30.962Z'
title: 'Toggle content on click without javascript (Yes you read that right)'
summary: 'Usually every time we want to toggle content on a website on click we use javascript. In this article, we are going to explore a different way of doing this by just using CSS capabilities.'
series: ['Did You Know', 'CSS, Styling and Preprocessors']
featuredImage: '2019-09-26-toggle-content-on-click.png'
---

Usually every time we want to toggle content on a website on click we use javascript. In this article, we are going to explore a different way of doing this by just using CSS capabilities.

## The power behind :target selector

Not many people know this but there is a fantastic _pseudo-class_ that allows us to apply styles to elements when a specific hash link is present or not in an URL, the name of this _pseudo-element_ is `:target` and it is the protagonist of this short article.

## Straight to the point, let's toggle stuff

Based on the explanation above, you may now imagine what I am about to do, so let's do it:

First, let's create a base HTML structure

```html{6,10}
<div>
    <p>This is some expandable content.</p>

    <p id="hashLink">
        I have expanded like a Pufferfish.
        <a href="#">Please collapse this poor fish.</a>
    </p>
</div>

<a href="#hashLink">Expand</a>
```

and some CSS:

```css{5,6,7}
#hashLink {
    display: none;
}

#hashLink:target {
    display: block;
}
```

## What are we doing here? let's explain

1. We are creating one anchor to add a hash `#hashLink` to the URL (Expands the content).
2. We are creating a second anchor inside of the second paragraph to remove that anchor and leave it empty (Collapses the content).
3. The content we want to toggle is contained within a paragraph that has an id equal to the hash we are going to be adding to the URL.
4. We are adding a `display: none;` to the element with id `hashLink` so that it is hidden by default.
5. We are adding a `display: block;` to the `#hashLink:target` selector, this is what makes the magic happen, when the hash is present in the URL this style gets applied, creating the effect of toggling on click.

There is no really much more to explain, as you see it is straightforward, if you want to see a live example check the codepen below.

<iframe height="265" style="width: 100%;" scrolling="no" title="LYPawYY" src="https://codepen.io/enmanuelduran/embed/LYPawYY?height=265&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/enmanuelduran/pen/LYPawYY'>LYPawYY</a> by Enmanuel Durán
  (<a href='https://codepen.io/enmanuelduran'>@enmanuelduran</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

This selector is powerful, be creative and feel free to post cool things you decide to do with it.
