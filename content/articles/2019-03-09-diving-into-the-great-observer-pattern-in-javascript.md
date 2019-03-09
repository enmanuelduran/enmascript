---
date: '2019-03-09T17:10:00.962Z'
title: 'Diving into the great observer pattern in javascript'
summary: "The observer pattern is widely used today in the Javascript world, in this article I'll explain how it works, how we can implement it and some good use cases."
series: ['Javascript']
featuredImage: '2019-03-09-observer-cover.png'
---

Design patterns are an international language, they're also a great way of dealing with problems, sometimes you'll be able to notice when a specific pattern is useful and other times you'll have to think a little harder to figure out which one to use (or if you need to use one at all for that particular case). In this article, we're going to be exploring one of the most applied and powerful behavioral patterns, **the observer pattern**.

## Definition

the observer pattern is without a doubt one of the most powerful design patterns there is, it bases its argument on using a subscription mechanism to notify interested objects **(the observers)** when certain event has occurred, the objects in charge of notifying this changes are usually called **subjects**, by doing this the objects interested in an event **(the observers)** don't have to be periodically checking if the event has happened or if it's close to happening, they just subscribe and wait for an event/action to occur so that they're notified by the subject.

**This could be a simple visual representation of how the observer works:**

![](/images/2019-03-09-observer-flow.png)

## Explaining with a use case example

I have always said that the best way to understand how something works is by trying it yourself, so, let's understand the observer pattern better by making an example.

let's imagine you work for a company that writes news, and you're assigned with the following task:

<mark>Create an application where writers can post short and concise information on threads and users have the ability to _follow_ these threads.</mark>

<mark>**Specific requirements:**</mark>

-   <mark>Writers should be able to write a short text and then post it on a thread (currently there are only two threads, tech, and design)</mark>
-   <mark>Users should be able to subscribe to threads</mark>
-   <mark>Users should be able to unsubscribe to threads</mark>

Ok, so first, we start by creating a section that contains a couple of inputs, in this way the **writers** are able to post on the threads **tech** and **design**, these two inputs will have individual buttons in order to post the information.

let's call this file **index.html:**

```html{3,9}
<h1>Threads</h1>

<!-- Writers will write Tech related posts here -->
<div class="thread tech">
    <input type="text" class="js-tech-text" placeholder="Write tech info here...">
    <button class="js-post-tech">Post on Tech</button>
</div>

<!-- Writers will write Design related posts here -->
<div class="thread design">
    <input type="text" class="js-design-text" placeholder="Write design info here...">
    <button class="js-post-design">Post on Design</button>
</div>
```

Here a visual representation on how it'd look (With some CSS added):

![](/images/2019-03-07-threads.png)

Also we'll add another section for _users_ in the same **index.html**, this will be below the _threads_ section, in here we will simulate the users and will show some buttons so that they can subscribe and unsubscribe to each individual thread.

```html{6,11,17,25,29,30,36,44,49,55}
<h1>Users</h1>
<div class="user js-user-1">
    <div class="head">
        <h2>User 1</h1>

        <!-- This shows the current threads to which the user is subscribed -->
        <div class="status js-stat-tech">Unsubscribed to tech</div>
        <div class="status js-stat-design">Unsubscribed to design</div>
    </div>

    <!-- User 1 can subscribe and unsub from the threads -->
    <button class="js-sub-tech tech">Subscribe to tech</button>
    <button class="js-unsub-tech tech">Unsubscribe to tech</button>
    <button class="js-sub-design design">Subscribe to design</button>
    <button class="js-unsub-design design">Unsubscribe to design</button>

    <!-- The updates from each thread will be shown on the list below for user 1 -->
    <ul class="js-updates"></ul>
</div>

<div class="user js-user-2">
    <div class="head">
        <h2>User 2</h1>

        <!-- This shows the current threads to which the user 2 is subscribed -->
        <div class="status js-stat-tech">Unsubscribed to tech</div>
        <div class="status js-stat-design">Unsubscribed to design</div>
    </div>

    <!-- User 2 can subscribe and unsub from the threads -->
    <button class="js-sub-tech tech">Subscribe to tech</button>
    <button class="js-unsub-tech tech">Unsubscribe to tech</button>
    <button class="js-sub-design design">Subscribe to design</button>
    <button class="js-unsub-design design">Unsubscribe to design</button>

    <!-- The updates from each thread will be shown on the list below for user 2 -->
    <ul class="js-updates"></ul>
</div>

<div class="user js-user-3">
    <div class="head">
        <h2>User 3</h1>

        <!-- This shows the current threads to which the user 3 is subscribed -->
        <div class="status js-stat-tech">Unsubscribed to tech</div>
        <div class="status js-stat-design">Unsubscribed to design</div>
    </div>

    <!-- User 3 can subscribe and unsub from the threads -->
    <button class="js-sub-tech tech">Subscribe to tech</button>
    <button class="js-unsub-tech tech">Unsubscribe to tech</button>
    <button class="js-sub-design design">Subscribe to design</button>
    <button class="js-unsub-design design">Unsubscribe to design</button>

    <!-- The updates from each thread will be shown on the list below for user 3 -->
    <ul class="js-updates"></ul>
</div>
```

Again, here a visual representation on how the whole thing would look with some CSS:

![](/images/2019-03-07-users.png)

Excellent, so everything appears to be covered from a visual perspective, let's see our list:

-   [x] Writers should be able to write a short text and then post it on a thread (currently there are only two threads, tech and design)
-   [x] Users should be able to subscribe to threads
-   [x] Users should be able to unsubscribe to threads

And, as a plus, users are able to see if they're currently subscribed or unsubscribed to a particular thread (those grey boxes at the right side of their name, I thought it'd be a nice touch to show this so that the UX of the example is better).

## Implementing the Observer Pattern in Javascript

Excellent, we have a "beautiful" interface that doesn't do anything, **YAY (?)**... now let's get serious and let's add some javascript, the javascript that will finally make all work and show us how the observer pattern could be implemented for this task.

First we'll implement the main **Subject.js** this file will contain the events needed to notify the observers which in this case are the list of subscribed users, also this file will contain the events to be able to subscribe and unsubscribe to a thread, this file could also be called Publisher or EventManager.

**subjects/Subject.js** looks something like this (Read the comments in the code for a better explanation):

```javascript
class Subject {
    constructor() {
        /**
         * The list of threads observed based on each user's instance.
         * this will contain a list of observers.
         */
        this.observers = [];
    }

    isSubscribed(f) {
        /* Help us check if the observer for an user is already subscribed */
        return this.observers.filter(subscriber => subscriber === f).length;
    }

    subscribe(f) {
        /* Verifies that the user is not subscribed already */
        if (this.isSubscribed(f)) return;

        /* If the user is not subscribed adds the function to the list */
        this.observers.push(f);
    }

    unsubscribe(f) {
        /**
         * returns a new array of functions without the one passed as argument,
         * Basically unsubscribing the user from that thread.
         */
        this.observers = this.observers.filter(subscriber => subscriber !== f);
    }

    notify(data) {
        /**
         * notifies the user, it passes the data to each observer
         * set in the list so that it's updated.
         */
        this.observers.forEach(observer => observer.update(data));
    }
}

export default Subject;
```

If you're a little confused right now, even after reading the comments, don't worry... everything will start taking shape as we continue to move forward.

### Adding the specific subjects

Cool! Now we'll need to add two subjects that will extend the functionality from the main `Subject` class, there will be one for each type of thread that users will be able to follow. As we said before, subjects are the ones that notify observers when a change has happened.

The first one will be **subjects/TechThread.js**, and one way of implementing it will be like:

```javascript
import Subject from './Subject.js';

class TechThread extends Subject {
    constructor() {
        super();

        this.bindArticlePost();
    }

    bindArticlePost() {
        /* Saves the "Post on Tech" button as well as the input text */
        const postTechBtn = document.querySelector('.js-post-tech');
        const jsTechText = document.querySelector('.js-tech-text');

        /* notifies that new information was post when clicking the post button */
        postTechBtn.addEventListener('click', () => {
            this.notify(jsTechText.value);
        });
    }
}

export default TechThread;
```

The `DesignThread` class looks exactly the same, **subjects/DesignThread.js:**

```javascript
import Subject from './Subject.js';

class DesignThread extends Subject {
    constructor() {
        super();
        this.bindArticlePost();
    }

    bindArticlePost() {
        const postDesignBtn = document.querySelector('.js-post-design');
        const jsDesignText = document.querySelector('.js-design-text');

        postDesignBtn.addEventListener('click', () => {
            this.notify(jsDesignText.value);
        });
    }
}

export default DesignThread;
```

Very simple, if we needed more subjects we would continue to add them in this folder.

### Adding the Observers

Observers basically subscribe to the subjects, they get an instance of the subject so that they can **subscribe/unsubscribe** to it, in our case, we'll create the `TechThreadObserver` and `DesignThreadObserver`, these classes will be in charge of having an update method which will be the one that will update the user's with the information comming from the threads.

**observers/TechThreadObserver.js** (Check the comments for explanation):

```javascript{27,35,48-53}
class TechThreadObserver {
    /**
     * We get the subject techThread and the userId that will observe
     * that particular thread.
     */
    constructor(techThread, { userId }) {
        /* Container for each user based on the ID*/
        this.userContainer = document.querySelector(`.js-user-${userId}`);

        /* Section that will receive the updates from the threads */
        this.userUpdates = this.userContainer.querySelector('.js-updates');

        this._bindEvents(techThread);
    }

    _bindEvents(techThread) {
        /* These two buttons will allow us to add listeners to subscribe/unsubscribe */
        const subTechBtn = this.userContainer.querySelector('.js-sub-tech');
        const unsubTechBtn = this.userContainer.querySelector('.js-unsub-tech');

        /* little grey box that shows if the user is currently subscribed to Tech */
        const techSubStatus = this.userContainer.querySelector('.js-stat-tech');

        /* Add the listener to the button subscribe to tech */
        subTechBtn.addEventListener('click', e => {
            /* Subscribes to the thread */
            techThread.subscribe(this);

            /* Update the status of the user to reflect it's subscribed */
            techSubStatus.classList.add('active');
            techSubStatus.innerHTML = 'Subscribed to tech';
        });
        unsubTechBtn.addEventListener('click', e => {
            /* Unsubscribes to the thread */
            techThread.unsubscribe(this);

            /* Update the status of the user to reflect it's not subscribed */
            techSubStatus.classList.remove('active');
            techSubStatus.innerHTML = 'Unsubscribed to tech';
        });
    }

    /**
     * Function which will be in charge of updating each user when
     * a new post from tech is added, this function is invoked by the Subject class
     * when the notify method is called.
     */
    update(data) {
        const listElement = document.createElement('li');
        listElement.innerHTML = `[Tech Post] - ${data}`;

        this.userUpdates.appendChild(listElement);
    }
}

export default TechThreadObserver;
```

And similarly we create the **observers/DesignThreadObserver.js** that does exactly the same but for the Design thread.

```javascript{22,28,31-37}
class DesignThreadObserver {
    constructor(designThread, { userId }) {
        this.userContainer = document.querySelector(`.js-user-${userId}`);
        this.userUpdates = this.userContainer.querySelector('.js-updates');

        this._bindEvents(designThread);
    }

    _bindEvents(designThread) {
        const subDesignBtn = this.userContainer.querySelector('.js-sub-design');
        const unsubDesignBtn = this.userContainer.querySelector(
            '.js-unsub-design'
        );
        const designSubStatus = this.userContainer.querySelector(
            '.js-stat-design'
        );

        subDesignBtn.addEventListener('click', e => {
            designSubStatus.classList.add('active');
            designSubStatus.innerHTML = 'Subscribed to design';

            designThread.subscribe(this);
        });
        unsubDesignBtn.addEventListener('click', e => {
            designSubStatus.classList.remove('active');
            designSubStatus.innerHTML = 'Unsubscribed to design';

            designThread.unsubscribe(this);
        });
    }

    update(data) {
        const listElement = document.createElement('li');
        listElement.innerHTML = `[Design Post] - ${data}`;

        this.userUpdates.appendChild(listElement);
    }
}

export default DesignThreadObserver;
```

So, in a nutshell Observers are subscribing when clicking on the subscribe button for each user, and they're subscribing to whatever is posted by the writers in the relevant threads.

## Gluing all the pieces together

Now, we are only missing one piece from the puzzle in order to connect all of this, our **main.js** file where we will be able to instanciate subjects and observers..

```javascript
import TechThread from './subjects/TechThread.js';
import DesignThread from './subjects/DesignThread.js';
import TechThreadObserver from './observers/TechThreadObserver.js';
import DesignThreadObserver from './observers/DesignThreadObserver.js';

function init() {
    /* We instanciate our subjects */
    const techThread = new TechThread();
    const designThread = new DesignThread();

    /**
     * Observers are instanciated for each user and we're
     * passing the subjects needed to each observer.
     **/
    new TechThreadObserver(techThread, { userId: 1 });
    new TechThreadObserver(techThread, { userId: 2 });
    new TechThreadObserver(techThread, { userId: 3 });

    new DesignThreadObserver(designThread, { userId: 1 });
    new DesignThreadObserver(designThread, { userId: 2 });
    new DesignThreadObserver(designThread, { userId: 3 });
}

init();
```

Very simple, each observer receives the instance from the relevant subject so that they can subscribe and unsubscribe from them, they're as well receiving the `userId` which makes possible the isolation of the users, allowing them to interact with subjects independently.

## Folder Structure

With all the implementation in place we now end up with this folder structure:

```javascript
├── main.js
├── index.html
├── index.css
├── subjects//
│   ├── TechThread.js
│   └── DesignThread.js
└── observers/
    ├── TechThreadObserver.js
    └── DesignThreadObserver.js
```

Based on this, everytime you want to add a new observer or subject you'd do it in their particular folders, then, you'll have to create the instance in the **main.js** file and that is it.

## See it in action

First, subscribe one of the users to one thread, then make a post and see what happens in the user box you clicked.

<iframe height="610" data-default-tab="babel" style="width: 100%;" scrolling="no" title="Observer Pattern, EnmaScript.com" src="//codepen.io/enmanuelduran/embed/GeEvJo/?height=410&theme-id=dark&default-tab=none,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/enmanuelduran/pen/GeEvJo/'>Observer Pattern, EnmaScript.com</a> by Enmanuel Durán
  (<a href='https://codepen.io/enmanuelduran'>@enmanuelduran</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Did you like this article about design patterns? if you did you'll probably like the implementation of the [factory pattern](https://enmascript.com/articles/2018/10/05/javascript-factory-pattern) we did some time ago.

Ok great developers from the future, this is all for this article, if you enjoyed it I invite you to share it with your friends and coworkers... remember you can follow me on twitter [@duranenmanuel](https://twitter.com/duranenmanuel).

See you in the next one!
