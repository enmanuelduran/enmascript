---
date: "2018-10-12T17:12:33.962Z"
title: "The power of dynamic imports in Javascript and React"
summary: "Dynamic imports are a very powerful feature, in this article I'll walk you through some of the most important concepts and practices."
series: ["React", "Performance", "Javascript"]
featuredImage: "2018-10-12-dynamic-imports.png"
---

Dynamic imports are great, they've been out there for a while and presume many improvements in the way we treat modules/components. In this article, I'm going to be explaining how they work, why they're so good and some of the things we could accomplish by using them.

If you read my previous article about [factory pattern in javascript](https://enmascript.com/articles/2018/10/05/javascript-factory-pattern) you probably know already that there are some good ways of creating instances dynamically in javascript, _BUT_, this does not mean that the other objects imported _(the not instantiated ones)_ will not be added to our initial bundle as well, because, after all, we're importing all the objects, the only difference as I said is that _they're dynamically instantiated_. What if I tell you that we could actually import _the content_ of the modules dynamically and include it later when we need it?

## Introducing Dynamic imports

The Dynamic import() is a [javascript proposal currently on stage 3](https://github.com/tc39/proposal-dynamic-import), as we know ECMAScript modules are _static_ but thanks to this proposal they don't always have to be, in a nutshell, the dynamic import() syntax allows us to load modules on demand by using promises or the async/await syntax, an example/implementation for this would be:

```javascript
import('./Module').then(Module => Module.method());
```

Now, imagine the applications in your site with components like modals, tooltips, technologies such as SPA's and in libraries like React, we could do many things:

1. Components/Modules Prefetching
1. Loading code on demand (Lazyloading)
1. Conditional loading without having to include unused code.

The evident impact of dynamic imports is found in the reduction of our bundle's sizes, the _size/payload response_ of our requests and overall improvements in the user experience especially on SPA's when prefetching code.

## Implementation using React and async/await

Imagine you have a component that could be lazy-loaded or fetched on a certain event (click), this component would need to be added into our app dynamically and will need to make use of a structure that allows us to update our react app in response to a change, I know, what a better structure than React's state?, it allows us to make dynamic changes in our app and more so let's go ahead and use it.

I'll basically make a very simple implementation that adds the link to our Github in the header dynamically when clicking a div.

First let's start creating a very dumb component that only renders the Github link in the menu, let's call it **DynamicComponent.js**, the code for it is:

```jsx
import React from 'react';
import { GitHub } from 'components/Icons/SocialIcons';

const DynamicComponent = () => (
    <a
        className="github-link"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/enmanuelduran/enmascript">
        <GitHub />
        GitHub
    </a>
);

export default DynamicComponent;
```

Now, in the **Header.js** component, I'll add the code to dynamically render the link when clicking a certain div, I'll comment everything in the code so that you can understand as you read:

```jsx
class Header extends React.Component {

    /* Sets the state to save the dynamic component when needed */
    state = {
        DynamicComponent: null,
        ...
    };

    /*
     * Function to be called onClick event.
     * Waits for the import to be completed and stores the default exported
     * value in the state so we can rendered when needed.
     */
    handleOnClick = async () => {
        const DynamicComponent = await import('./DynamicComponent');

        this.setState({
            DynamicComponent: DynamicComponent.default
        });
    };

    render() {
        ...

        /* Gets the dynamically imported component */
        const { DynamicComponent } = this.state;

        return (
            <header className="header">

                {/* Calls the function needed onClick */}
                <div
                    onClick={this.handleOnClick}>
                    Load Github!
                </div>

                <nav>
                    ...

                    {/* Waits for the component to exist and renders it */}
                    {DynamicComponent && <DynamicComponent />}
                </nav>
            </header>
        );
    }
```

Very simple, here is a visual example of the implementation working, you'll notice that when clicking the yellow button the component that contains the Github link is added to the menu and is dynamically fetched as shown in the network request:

<p>
    <video autoplay loop muted playsinline>
        <source src="/images/2018-10-11-dynamic-imports.mp4" type="video/mp4">
    </video>
</p>

This feature opens the door to many possibilities and improvements, not only on React but in Javascript in general, hopefully, after reading this article you already started to spot places in your code where dynamic imports could be added to make improvements. If you enjoyed this article please share it in your social networks or with your friends. You can find me/contact me on twitter with the user name [@duranenmanuel](https://twitter.com/duranenmanuel) or using my email <duranenmanuel@gmail.com>.

That's it for now guys, see you in the next one!
