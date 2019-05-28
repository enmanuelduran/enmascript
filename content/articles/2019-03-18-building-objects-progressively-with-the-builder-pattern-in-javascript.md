---
date: '2019-03-18T17:12:33.962Z'
title: 'Building objects progressively with the builder pattern in javascript'
summary: "The builder pattern allows us to create objects gradually as we consume or process information, in this article we'll be understanding how it works with some examples and definitions."
series: ['Javascript']
featuredImage: '2019-03-18-builder-pattern-cover.png'
reddit: 'https://www.reddit.com/r/javascript/comments/b2ikoc/building_objects_progressively_with_the_builder/'
---

When working in javascript, one of the things that happen commonly is the construction of complex objects, these evolve or change with the passage of time, either when the application grows or when certain processes are executed. There are multiple ways of creating complex objects, in this article, I'm going to be explaining one design pattern that does it very well and we'll compare it with other approaches that are widely used.

## The problem

Let's suppose we have an app in which users can personalize their Profile page based on the following properties:

-   **menuLocation** (top/bottom/left/right)
-   **borders** (soft/normal)
-   **theme** (either dark/light)
-   **coverImage** (String URL)

We need to give users the ability to personalize their profiles in a viable way that allows our application to scale at the same time, by looking at this problem there are two popular approaches we could use to solve it excluding the builder pattern, let's see them quickly:

### 1. Adding Sub-classes for each possible profile variation
Create a `Profile` class  that contains the default object properties and then have some sub-classes inherit from it. This is not bad, but take a minute and think about it, this means that in order to cover all the cases, the number of sub-classes should be equal to all the possible variations, which would end up in an elevated number of sub-classes being created, **not good**.

### 2. Adding all the variations to the Profile class constructor

As specified in the title, another approach could involve having the same `Profile` class and pass the needed properties as arguments in the constructor, this would remove the dependency on the sub-classes:

```javascript
class Profile {
    constructor(
        menuLocation = 'top',
        borders = 'soft',
        theme = 'dark',
        coverImag = 'default.jpg'
    ) {
        this.menuLocation = menuLocation;
        this.borders = borders;
        this.theme = theme;
        this.coverImage = coverImage;
    }
}
```

This totally works, and if it's a class that we're **sure** will not grow, then we can go ahead and use this approach, there is no need to overcomplicate things if the requirements are short and simple. If on the other hand the `Profile` class needs flexibility and has potential to grow, then scaling it in this way can become quite problematic. Imagine that suddenly the company wants to add multiple new features to personalize the profile such as **backgroundColor**, **menuColor** and **profileFont**, by just adding these 3 properties we will start to have problems setting and identifying the arguments of the constructor when instantiating it, this problem is also known as _the telescopic constructor problem_, and it's recognized to be an anti-pattern, if you don't know what I mean, then check out the example below:

Let's add the new properties:

```javascript
class Profile {
    constructor(
        menuLocation = 'top',
        borders = 'soft',
        theme = 'dark',
        coverImage = 'default.jpg',
        backgroundColor= 'blue',
        menuColor= 'white',
        profileFont= 'roboto'
    ) {
        this.menuLocation = menuLocation;
        this.borders = borders;
        this.theme = theme;
        this.coverImage = coverImage;
        this.backgroundColor = backgroundColor;
        this.menuColor = menuColor;
        this.profileFont = profileFont;
    }
}
```

Now look at what happens when you instantiate the class:

```javascript
new Profile(null, 'soft', 'dark', null, null, 'red');
```

Just like that you end up having a ridiculous amount of arguments in the constructor which is in principle a _code smell_, also most of the parameters passed will be **null** because most of the time we won't need to define all of them and we'll instead use the default values, this now leaves us with a very complicated constructor in which it's hard to identify what value corresponds to what argument.

## Building your application step by step with the Builder Pattern

![](/images/2019-03-18-builder-pattern-cover.png)

The builder pattern promotes the creation of complex objects _step by step_, it specifies the following:

1. **We have a base class that contains the business logic**, it also receives the created object to set the values (in our case the `Profile` class).
2. **We should Isolate the code that is in charge of the object creation into different objects/classes called _builders_.** Each builder will be in charge of defining the steps to construct complex objects
3. **There is an optional class called _Director_**, it's used to define methods that execute steps in a specific order to build commonly created objects (we'll see more about it later on this article).

So, let's start implementing the Builder pattern based on the list defined above.

### 1. We have a base class that contains the business logic

Below is the `Profile` class, it will only contain business logic and set the values coming from the created object:

**Profile.js**
```javascript
class Profile {

    /* Receives the builder and assigns the values */
    constructor(builder) {
        this.menulocation = builder.menuLocation;
        this.borders = builder.borders;
        this.theme = builder.theme;
        this.coverimage = builder.coverImage;
        this.backgroundcolor = builder.backgroundColor;
        this.menucolor = builder.menuColor;
        this.profilefont = builder.profileFont;
    }

    /* Some Business logic and abstract/generic methods here */
}
```
### 2. We should Isolate the code that is in charge of the object creation to a class called Builder

We'll create the file **(builders/ProfileBuilder.js)**, it'll contain a class that will be in charge of defining the steps that will progressively create our complex object, it'll also implement a `build` or `get` method that will return the object once it's been finished:

```javascript
import Profile from './Profile';

class ProfileBuilder {
    constructor(){ }

    /* Define all the steps needed to create a profile */

    setMenu(position) {
        this.menuLocation = position;
        return this;
    }

    setBorders(style) {
        this.borders = style;
        return this;
    }

    setTheme(style) {
        this.theme = style;
        return this;
    }

    setCoverImage(url) {
        this.coverImage = url;
        return this;
    }

    setBackgroundColor(color) {
        this.backgroundColor = color;
        return this;
    }

    setMenuColor(color) {
        this.menuColor = color;
        return this;
    }

    setProfileFont(fontFamily) {
        this.profileFont = fontFamily;
        return this;
    }

    /* Could also be called getProfile() */
    build() {
        return new Profile(this);
    }
}

export default ProfileBuilder;
```

Notice how each function is in charge of setting the object's properties, this means that we can add validations inside of them when required, we can also have multiple builders for different parts of the profile page (if we think it's convenient to scale the application), so, for example, we could have the classes `MenuBuilder`, `CoverBuilder` and `ThemeBuilder`, then we can abstract all the relevant steps inside of them, this for the cases in which there is potential room to grow. Partitioning your code _sanely_ is always a good idea (Yes, we will have some extra classes, but they'll not be as many as the _sub-classes_ approach, not even close).

Now, when we need to create new custom profiles we can do it in our **main.js** like:

```javascript
import ProfileBuilder from './builders/ProfileBuilder';


function main() {
    return new ProfileBuilder()
        .setMenu('top')
        .setBorders('soft')
        .setTheme('dark')
        .setCoverImage('url.jpg')
        .setBackgroundColor('red')
        .setMenuColor('white')
        .setProfileFont('Arial')
        .build();
}

main();
```

Here we're passing the values as strings directly, but these values could be set by the user by sending a form or any dynamic structure.

### 3. The Director

As your application grows you'll see that certain types of profiles are more likely to be created, you'll want to have a "popular profile" template that's already defined so that users don't have to do all the work manually. Let's say that a popular profile is recognized for having:

- **menuLocation**: left
- **borders**: soft
- **theme**: light
- **coverImage**: rain.jpg
- **backgroundColor**: black
- **menuColor**: blue
- **profileFont**: Ubuntu


The _Director_ is in charge of executing steps to create objects automatically in cases where it makes sense to do it (usually when there are some common structures that could be pre-defined like in this case the popular profile). Now that we know how to construct this type of profile we can have the director do this work for us:

**ProfileDirector.js**

```javascript
class ProfileDirector {
    /* The director receives the builder */
    constructor(builder) {
        this.builder = builder;
    }

    /* Implements a method to automatically generate a popular profile */
    createPopularProfile() {
        return this.builder
            .setMenu('top')
            .setBorders('soft')
            .setTheme('light')
            .setCoverImage('rain.jpg')
            .setBackgroundColor('black')
            .setMenuColor('blue')
            .setProfileFont('Ubuntu')
            .build();
    }
}
```

You could keep adding methods to the director as long as it's logic, **don't add all possible variations because we would be falling into the same problem we had in the sub-classes approach**. An important fact to notice is that **the director is not always required**, the client should be able to create objects on demand step by step, the director is just a nice way of avoiding common repetitions. After implementing the director we could use it in our **main.js**:

```javascript
import ProfileBuilder from './builders/ProfileBuilder';
import ProfileDirector from './ProfileDirector.js';

function main() {
    const profileBuilder = new ProfileBuilder();
    const director = new ProfileDirector(profileBuilder);
    return director.createPopularProfile();
}

main();
```

Below a simple visual representation of the builder pattern:

![](/images/2019-03-18-builder-pattern-flow.png)

## Folder Structure

After implementing the builder pattern this could be a potential structure of our application:

```
├── main.js
├── Profile.js
├── ProfileDirector.js
└── builders/
    ├── ProfileBuilder.js
    └── ...
```

As the application grows, you'll have more builders and you'll need more directors, if this happens, it'll be ok to have the directors in the same folder as the builders they'll need, a recommended structure could be the one below, but feel free to implement a folder structure that makes sense for you and your team:

```
├── main.js
├── Profile.js
└── builders/
    ├── Profile/
    │   ├── ProfileBuilder.js
    │   └── ProfileDirector.js
    └── Menu/
        ├── MenuBuilder.js
        └── MenuDirector.js
```

This is it for this article developers of the future, I hope you have enjoyed it, if you did you'll probably enjoy reading about [the factory pattern](https://enmascript.com/articles/2018/10/05/javascript-factory-pattern) and the [Observer pattern](https://enmascript.com/articles/2019/03/09/diving-into-the-great-observer-pattern-in-javascript), also if you want to ask me something you can do it on twitter [@duranenmanuel](https://twitter.com/duranenmanuel).

See you in the next one!
