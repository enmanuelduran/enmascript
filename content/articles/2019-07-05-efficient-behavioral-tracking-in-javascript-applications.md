---
date: '2019-06-04T17:10:30.962Z'
title: "Efficient behavioral tracking in javascript applications"
summary: "Tracking is an essential part of product development, either for web development, mobile applications or any software you might be working on; it is crucial to understand your users and therefore to make your business growth."
series: ['Javascript']
featuredImage: '2019-06-04-webperf-code-quality-cover.png'
---

Tracking is an essential part of product development, either for web development, mobile applications, or any software you might be working on; it is crucial to understand your users to make your business growth.

If you don't know what behavioral tracking is or you have not implemented tracking in your projects, I can compress the explanation in a single paragraph:

<mark>_**Behavioral tracking** is the way companies get valuable information about meaningful events that have taken place in their platform/applications; this is especially useful to understand how users behave and to identify potential downfalls and opportunities in specific flows._</mark>

As you read in the simplistic definition above, it is all about getting valuable information from events, i.e., _call to action clicks, users logins..._ to achieve this as developers, we need a technical implementation that allows us to apply this in an efficient and scalable manner, but, as you will soon realize, tracking comes with some technical challenges.

## A starting point

Usually, you find that it is reasonably common between codebases to have isolated modules dedicated for tracking, these modules are just simple encapsulated functionalities that allow you to send information to an endpoint that stores the payload received from the users based on specific types of events.

Below a naive implementation of how a tracking module could look:

```javascript
class Tracker {
    static get ENDPOINT_URL() {
        return "my.endpoint.domain/tracking"
    }

    async track(payload) {
        const response = await fetch(
            Tracker.ENDPOINT_URL,
            {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(payload)
            }
        );

        return response;
    }

    ...
}
```

As you can see above, we are just creating a class that contains a method that allows us to post information to an endpoint; this example is overly simple but is enough for this article's purpose, in a real world escenario you will/should have a model that validates the parameters you want to track and the type of data sent as the payload.

<mark>For this article's purpose, we are going to start by having as a target tracking a subscription button, this so that we can understand how many users are engaging with it.</mark>
:

```html
<button class="js-tracked-click subscription-button">
    Subscription Button 1
</button>
```

Now let's see how we can apply different patterns to track this same element.

## In module tracking
Consists of importing the tracking module in your application's modules and injecting the tracking function in the pieces of logic/relevant blocks of code. The implementation of this pattern would look something like this:

```javascript{11-14}
import Tracker from './Tracker';

class SubscriptionButton {
    constructor() {
        this._buttonHandler();
    }

    _onButtonClick() {
        console.log('Click handler function');

        Tracker.track({
            type: 'click',
            element: 'Subscription_button_1'
        });
    }

    _buttonHandler() {
        const button = document.querySelector('.js-tracked-click');

        button.addEventListener('click', this._onButtonClick.bind(this));
    }

    ...
}
```

Very simple and functional, this approach is widely used, it has some good and bad parts, lets analyze them:

### Pros:
- **Flexibility**. Since we are adding the tracking method inside of the scripts functionality it is effortless to add tracking pretty much any logic.
- **Simplicity**. Adding trackers is a simple task since it is just a matter of adding the function to the logic that requires it.
- **Unification**. The tracking code is in the same place as the original's script code, while this is bad on one side, it is good in the way that it allows you to be aware of it anytime you have to make a change on functionality.

### Const:
- **Single responsibility is not respected**. Adding the tracking functionality inside of script's core code violates the single responsibility principle.
- **Tracked elements are not easy to identify**. Each script contains the tracking functionality on its core which means that we need to go to its definition and look into the code where the tracking might be added
- **Scalability risk**: Since this approach is very flexiblea it can easily get out of hand so it might be a good idea to stablish some ground rules.

## Isolating tracked methods by extending its original definition
Extending the original class is another approach that tries to isolate the elements that are tracked out of the original's script functionality, the idea is to extend the code to create an extra layer dedicated to track events, let's see an example:

We implement the script functionality:

```javascript
class SubscriptionButton {
    constructor() {
        this._buttonHandler();
    }

    _buttonHandler() {
        this._button = document.querySelector('.js-tracked-click');

        this._button.addEventListener('click', this.onButtonClick.bind(this));
    }

    _onButtonClick() {
        this.elementHasClass = e.currentTarget.classList.contains('subscription-button');

        if (this.elementHasClass) {
            console.log('Click handler function');
        }
    }

    ...
}
```

then we implement the tracking

```javascript
import Tracker from './Tracker';

class TrackedSubscriptionButton extends SubscriptionButton {
    constructor() {
        super();

        this._trackedMethods();
    }

    _trackedMethods() {
        this._onButtonClickTracking();
        this._anotherTrackedElement();
    }

    _onButtonClickTracking() {
        if (super.elementHasClass) {
            super._button.addEventListener(
                'click',
                Tracker.track({
                    type: 'click',
                    element: 'Subscription_button_1'
                });
            );
        }
    }

    _anotherTrackedElement() { ... }
}
```

Notice how we are able to isolate the tracking related code in a different class, it is important that you realize that **we have to be careful to not duplicate the logic for the element you want to track**, make sure the logic is trackeable and reusable from the original class, notice that in the case above we are using a new event listener and condition, but the condition is actually the same from the parent's class, we are just reusing the property that defines it. This approach does not have to be implemented with inheritance, if you like to write functional and declarative code instead you can use a [Higher Order Function](https://enmascript.com/articles/2019/02/27/higher-order-functions-and-some-great-applications-in-javascript) that wraps the tracking functionality.

### Pros
- **Tracking code is isolated**. Single responsibility principle is respected.
- **Tracked elements are easy to detect, modify and delete**. This is simple to achieve since everything is a single place per each module.
- **Scalability**. If this approach is well applied you can scale your codebase easily.

### Const
- **Flexible but with constraints.** We can add tracking to any element we want but we have to always keep the tracking class into mind.
- **Mindset change**. When using this approach you need to always have tracking in your mind in the same way you do with unit testing, you always need to make sure your code is trackable in the isolated class, this can be good but has to be well thought.
- **Dangerous code and duplicated logic**. If you notice the isolated class, you will see we are adding a specific listener to track the click event, this can be dangerous especially if there is logic you need to add around the tracking (like a conditional). Also you will have to expose properties through `this` so that the parent class can inherited and use it.

### A Custom approach
Another way to keep tracking scalable and personalized is to create a custom centric tracking system, this pattern is very popular and I have seen it been used in multiple companies, it usually consists on tracking interactions based on dataset properties, in example let's say you want to track a click on an element:

Elements to track:
```html{1,5}
<button data-click-tracking="subscription_button_left">
    Subscribe
</button>

<button data-click-tracking="subscription_button_right">
    Subscribe
</button>
```

Unified click tracker functionality:
```javascript
import Tracker from './Tracker';

class ClickTracker {
    constructor() {
        this._bindClicks();
    }

    static get TRACKED_ATTRIBUTE() {
        return 'data-click-tracking';
    }

    static get TRACKED_ELEMENTS() {
        return document.querySelectorAll(`[${ClickTracker.TRACKED_ATTRIBUTE}]`);
    }

    _onClickHandler(event) {
        const element = event.currentTarget.getAttribute(ClickTracker.TRACKED_ATTRIBUTE);

        Tracker.track({ type: 'click', element }));
    }

    _bindClicks() {
        ClickTracker.TRACKED_ELEMENTS.forEach(element => {
            element.addEventListener('click', this._onClickHandler.bind(this));
        });
    }
}
```

In this way all click tracked elements will pass over the click handler and we will identify them by using a custom id passed through the dataset property. A good example of companies using this approach is Google on [google tag manager](https://tagmanager.google.com/) where you can define custom classes or data properties to be tracked and send information to _Google Analytics_. I consider this approach  to be the best of the ones mentioned so far since you can apply this same pattern for other types of events like scroll events, it is not limited to clicks.

### Pros
- **Custom implementation**. Made for the specific needs of the company.
- **Scalability.** A single script is in charge of the tracking so the other scripts remain untouched.
- **Single Responsibility**. It is preserved because the tracking functionality is in a dedicated module.

###  Cons
- **Constraints are present.** Since this approach consist on tracking elements from the DOM not all the cases will be covered, you will find out that especial functionalities will still need to be tracked on its core code,  this means that in especial ocassions you will have to import the tracking module and decide which approach you want to take [In module tracking](#in-module-tracking) or [extended approach](#isolating-tracked-methods-by-extending-its-original-definition)


## Tracking asynchronous requests
Generally you find yourself needing to track a form submission or a login event, for many reasons is not efficient to add the tracking to the button that submits the information (The login could fail or the form request could return an error) which means we would be tracking data incorrectly.

For this you could simply use the [In module tracking](#in-module-tracking) approach by adding the tracking function to the `200` response, this would be fine but you will endup with multiple conditions for each request needed to be tracked.

let's say you have a centralized Http client that you use for all asynchronous request (which will almost always be the case), this client returns a promise so that you can execute some code per module, then we get assigned some tracking requirements as follow:

<mark>We would like to track the following events to get some meaningful information about our users and to learn how we can improve their experience on the platform:</mark>

- <mark>Successful login events</mark>
- <mark>Successful Subscription events</mark>
- <mark>Logout events</mark>
- <mark>Call to action clicks</mark>

So we notice that the call to action click can be easily tracked with a click tracking event, but what about the other ones? All of them are different events using different URLs and needing different data to be tracked, so if we use a centralize http client it would look something like this:

```javascript
function HTTPPost(url = '', data = {}) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
         },
        cache: 'no-cache',
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}

export default HTTPPost;
```

and then we would be able to use it to track data like:

```javascript{5}
import HTTPPost from './http-client';

HTTPPost('/api/login', {userId, password, source: 'modal' })
    .then(response => {
        Tracker.track({ type: 'successful-login', ...response })
    }
    .catch(error => console.error(error))
```

this is not actually bad but we will have to import the Tracker module in every file that will execute the successful asynchronous request which sometimes is something that will be a let down depending on the companies needs.

## Centralizing Asynchronous tracking

This will be the last approach we will be covering on this article and it is one that I really like. The fundaments of this approach relies on adding the tracking function once in the HTTPClient, then we can leverage a dictionary that will contain the URLs we want to track, these will be mapped to a model of properties where each URL will require to be successfully tracked.

Let's explain with code step by step:

### 1) We add the tracking in the HTTPClient
We basically take the code from the previous approach and add the tracking on the promise response:

```javascript{15}
import Tracker from './Tracker';

function HTTPPost(url = '', data = {}) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
         },
        cache: 'no-cache',
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(response => Tracker.request(url, response));
}

export default HTTPPost;
```

As you see we are executing `Tracker.request` on all requests, now we have to define which requests we actually want to track and which parameters are relevant to be tracked for those requests, so we can make use of a dictionary like this:

```javascript
const TRACKED_URLS = {
    '/api/login': ['userId', 'source', 'url', 'type'],
    '/api/logout': ['userId', 'time', 'type'],
    'api/subscription': ['userId', 'source', 'type'],
    ...
};

export default TRACKED_URLS;
```

<mark>In the example above we are using a list to store the valid properties just to make the example simpler, you can create a real model that properly validates the information that each tracked URL needs</mark>. After this the method in charge of tracking the requests could be added to the class we already had to track, we can do something like this:

```javascript{23-35}
import TRACKED_URLS from './tracked-urls';

class Tracker {
    static get ENDPOINT_URL() {
        return "my.endpoint.domain/tracking"
    }

    async track(payload) {
        const response = await fetch(
            Tracker.ENDPOINT_URL,
            {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(payload)
            }
        );

        return response;
    }

    request(url, data) {
        const URL_PROPERTIES = TRACKED_URLS[url];
        const PAYLOAD_PROPERTIES = Object.keys(data);

        const arePropertiesValid = URL_PROPERTIES
            && URL_PROPERTIES.every(property => (
                PAYLOAD_PROPERTIES.includes(property)
            ));

        if (!arePropertiesValid) return false;

        this.track(data);
    }
}
```

Very simple, the `request` method just verifies that all the tracked elements have the correct properties passed, it serves as a centralized filter and as a centralized request's tracking dictionary, This approach is straight forward and scales very well because you have all the tracked URL's in a single place which allows you to add and delete on demand easily.

