---
date: "2018-07-19T17:12:33.962Z"
title: "Protect the integrity of your applications with Error Boundaries"
summary: "Error Boundaries are one of the coolest and more powerful features that we have today in react, it allow us to protect our applications and add security layers to our project."
series: "React"
featuredImage: "2018-07-19-error-boundaries.png"
---


Since version 16.0.0  _Error Boundaries_  have been part of React’s core but not enough people have paid attention to it. I consider this feature to be incredibly powerful and useful, if you don’t know why, you probably haven’t used it correctly, if you’re insecure about what it really does or you want to know why I think it’s great then continue reading.

First of all the definition,  **an Error Boundary is a component**  that allows us to catch errors that occur inside of the components wrapped by it, this allow us to do “something” when an error happens, it works very similarly to a classic javascript  `try { ... } catch() { ... }`, (yes, the same that you use to catch errors when parsing JSON), if used correctly this feature can add a lot of stability to your site and a great UX for your visitors.

Basically, a component becomes an error boundary when it implements the lifecycle method  `componentDidCatch`, an example of the implementation could be:

```jsx
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorMsg: null };
    }

    componentDidCatch(error, info) {
        this.setState({
            error: error,
            errorMsg: info
        })
    }

    render() {
        if (this.state.errorMsg) {
            return (
                <div>
                    An error ocurred but you can click other boxes!
                </div>
            );
        }

        return this.props.children;
    }
}
```

To use the ErrorBoundary component you can do it like so:

```jsx
<ErrorBoundary>
    <ChildComponent />
    <ChildComponentTwo />
</ErrorBoundary>
```

What the code above does is verify that the  `ErrorBoundary`  component doesn’t contain a  `this.state.errorMsg` defined, if it does then it means that one of the components wrapped by the error boundary failed and that the fallback behavior should be executed.

Suppose that you have a  _Single page application_, this application is formed by different components and  **not all of them are interconnected**_._  In this application, if we don’t use error boundaries when one of those components fails because of an unexpected javascript error or something similar it’ll cause the whole app to crash and a few milliseconds later we’ll have the classic white page that indicates that your beautiful application just suffered a cardiac attack, R.I.P.

Now, if you wrap your components strategically using error boundaries and one of the wrapped components fails, this will not scale and break the whole app, instead, the error will go up until it reaches its parent error boundary component and at this moment we’ll be able to show a personalized UI, show an alternative component or something even better… send the error data for tracking, BOOM!

Finally, let’s present error boundaries as they deserve to be presented (yes it’s what you are thinking), with a use case scenario (YAY!):

I have created a CodePen below, in this example I created 4 box components, 2 of them are “bad” (red) boxes that throw an error intentionally when clicking them and these are wrapped with the  `<ErrorBoundary>`  component, 1 of them is a “good” (blue) box that simply works logging a message to the console when clicking it and the last box is an “Ultimate Box of Death” (black) that will cause the whole app to crash because it’s not wrapped by an error boundary.

Woohoo, awesome right?, yes, I know… there is something else that you need to know though, not all the error are caught by error boundaries, here are the exceptions:

-   Event handlers
-   Asynchronous code
-   Server side rendering
-   Errors thrown in the error boundary itself (No Inceptions please, keep the logic for error boundaries safe and consistent)

Ok guys, that was it for this article, hope you enjoy the topic as I enjoyed writing it, if you did, please share it, if you want to share your thoughts you can do it in the comments section below, see you in the next one!
