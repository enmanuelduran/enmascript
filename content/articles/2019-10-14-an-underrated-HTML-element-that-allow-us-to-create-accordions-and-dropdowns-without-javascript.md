---
date: '2019-10-14T08:10:30.962Z'
title: 'Create dropdowns and accordions with just HTML no Javascript needed.'
summary: 'There are multiple elements that were introduced in HTML5 that are not used/known enough, on this article we are going to be covering <details>, one powerful element that will hopefully introduce you to some new ways of handling specific UI toggling interactions such as accordions or dropdowns.'
series: ['Did You Know']
featuredImage: '2019-09-26-toggle-content-on-click.png'
---

<style>
.details-example {
    background: #ffffff;
    border: 1px solid #13161b;
    border-radius: 10px;
}

.details-example summary {
    padding: 10px;
}

.details-example[open] summary {
    border-bottom: 1px solid #13161b;
}

.details-example[open] ul {
    padding: 0;
    margin: 0;
}

.details-example[open] li {
    border-bottom: 1px solid #13161b;
    list-style: none;
    padding: 5px 15px;
}

.details-example[open] li:last-child {
    border-bottom: 0;
}

.details-example {
    margin-bottom: 10px;
}
</style>

There are multiple elements that were introduced in HTML5 that are not used/known enough, one of them allow you to create interactive experiences such as accordions or dropdowns, its name is `<details>`.

## Create a dropdown/accordion with just HTML

I recently wrote an article on [how to create an onclick toggler without using javascript](/articles/2019/09/26/underrated-html-elements-that-allow-you-to-avoid-unnecessary-javascript) by leveraging the powerful CSS :target selector, but, that is not the only way to achieve this.

The `<details>` element allows us to implement a disclosure widget that hides and shows information depending on its boolean state `open`, this allows us to toggle content interactively and natively:

```HTML
<details class="details-example">
    <summary>If you click me I will display a list of content</summary>
    <ul>
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
    </ul>
</details>
```

**Demo**

<details class="details-example">
    <summary>If you click me I will display a list of content</summary>
    <ul>
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
    </ul>
</details>

As you can see the `<summary>` shows up and when clicking it we are showing the rest of the information (the list).

## Javascript integration

You can also execute **complementary javascript** when the open state of the details element changes, we can do that like this:

```javascript
const detailsElement = document.querySelector('.details-example');

detailsElement.addEventListener('toggle', event => {
    if (event.target.open) {
        console.log('open');
    } else {
        console.log('closed');
    }
});
```

Very simple yet powerful feature, some of its more notorious applications are for accordions, dropdowns and view more interactions.
