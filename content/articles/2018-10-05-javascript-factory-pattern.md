---
date: '2018-10-05T17:12:33.962Z'
title: 'Creating objects dynamically with factory pattern in javascript'
summary: "Let's learn how to take advantage of this creational pattern to organize and create objects dynamically in javascript."
series: ['Javascript']
featuredImage: '2018-10-07-factory-pattern.png'
---

When creating features, we often need to create instances based on parameters coming from an endpoint or a similar dynamic source. In this article I'll try to _give you an idea_ of how we can use the single factory pattern to approach such cases.

We'll refactor a piece of code to make it more scalable and understandable. Let's suppose we have this premise:

<mark>_Given an object of element's data, write an algorithm that allows users to provide a type of element to render it dynamically. Also, please validate the elements as required:_</mark>

1. <mark>_Generic input text fields such as Email and Password should be validated._</mark>
1. <mark>_Make sure line breaks are stripped off textarea elements._</mark>

Example of a source of data, let's call it **elementsData.js**:

```javascript
export default {
    elements: {
        email: {
            type: 'email',
            text: 'Email',
            name: 'userEmail'
        },
        summary: {
            type: 'textarea',
            text: 'Summary',
            name: 'summary'
        },
        role: {
            type: 'select',
            text: 'Role',
            name: 'role',
            options: [
                {
                    value: 1,
                    display: 'Software Developer'
                },
                {
                    value: 2,
                    display: 'Designer'
                },
                {
                    value: 3,
                    display: 'Manager'
                },
                ...
            ]
        },
        ...
    }
};
```

### A non-scalable approach

Now I'll write what could be a pseudo "solution" to dynamically create the types of form elements and validate them (note that I'll only define the methods that matter for the purpose of this article):

```javascript
import config from './elementsData';

export default class FormElement {

    constructor(type) {
        this.type = type;
        this.elements = config.elements;
    }

    getElementByType() {
        return this.type in this.elements ? this.elements[this.type] : null;
    }

    /* This would validate our email*/
    emailValidator() { ... }

    /* this would remove line breaks from our textareas */
    textareaSanitizer() { ... }

    /* We would use this to bind all the validators and sanitizers events */
    bindEventListeners() { ... }

    renderFormElement() {
        const element = this.getElementByType();

        if (!element) {
            return false;
        }

        switch(this.type) {
            case 'email':
                return `
                    <div class="field-wrapper">
                        <input type="email" name=${element.name} placeholder=${element.text} />
                    </div>
                `;
                break;
            case: 'textarea':
                return `
                    <div class="field-wrapper">
                        <textarea name=${element.name} placeholder=${element.text} />
                    </div>
                `;
            case 'select':
                return `
                    <div class="field-wrapper">
                        <select name=${element.name}>
                            ${element.options.map(option => `
                                <option value=${option.value}>
                                    ${option.display}
                                </option>
                            `)}
                        </select>
                    </div>
                `;
        }
    }
}
```

and we would instantiate the class in our **main.js** like:

```javascript
const formElement = new FormElement('email');
formElement.renderFormElement();
```

This should work, right? We're consuming the data, dynamically creating elements and validating them... BUT, there are some things we're not seeing. I want you to think: in the future, what would happen with this class when you or someone else needs to add more and more form elements? The `renderFormElements` method will grow, and we'll end up having a huge method with endless conditions and validation methods - and let's not even talk about the complexity and scalability.

### Implementing Single Factory

The factory pattern is a design pattern that's part of the _creational_ group. It basically deals with the issue of creating objects when the class that instantiates it needs to be dynamic. It also helps a lot with organizing your code, because:

1. Isolates the objects that need to be created.
1. Promotes small classes with less responsibilities.
1. Delegates the responsibility of object creation to a class called "factory."
1. Creates the instances by receiving the dynamic value in your entry point.

Here is a visual representation I created to demonstrate how the factory works:

![](/images/2018-10-07-factory-pattern.png)

Now we'll start by refactoring our "solution" based on the list we've created above.

#### Isolate the objects to keep single responsibilities

The form elements _select_, _email_, and _textarea_ can be easily isolated by moving the logic that involves them to a folder called `/FormElements` or `/FormElementTypes` (you can give any name that makes sense):

**/FormElements/email.js**

```javascript
export default class Email {
    constructor(element) {
        this.name = element.name;
        this.text = element.text;
    }

    bindEmailValidator() { ... }

    emailValidator() { ... }

    render() {
        return `
            <div class="email-wrapper">
                <input type="email" name=${this.name} placeholder=${this.text} />
            </div>
        `;
    }
}
```

Notice that we're moving the validation and binding methods to the element's class, and we would do the same for the other elements (_textarea_, _select_, etc.). This will allow us to scale and keep the logic for each type of element isolated.

#### Delegate the responsibility of object creation to a class called "factory"

The factory does a couple of things:

1. Imports the types of elements.
1. Creates an `ELEMENTS` object with the types of elements available.
1. Creates a static method to be able to create instances directly by using the class name.
1. Dynamically instantiates based on the type passed.

Below we have the code representing this:

**factories/elementsFactory.js**

```javascript
import Email from './FormElements/email';
import Textarea from './FormElements/textarea';
import Select from './FormElements/select';

const ELEMENTS = {
    Email,
    Textarea,
    Select
};

export default class ElementsFactory {
    static createInstance(data) {
        const elementCreator = ELEMENTS[data.type];
        const element = elementCreator ? new elementCreator(data) : null;

        return element;
    }
}
```

#### Creates the instances by receiving the dynamic value in your entry point (our main.js, in this case).

Nothing complex to explain here, we're just validating that the argument passed exists in our object of elements, if it does then we create an instance by using the factory method `createInstance`, we pass down the data needed and render the element with the `render` method. You can see the code below:

**main.js**

```javascript
import ElementsFactory as Factory from './factories/FormElementsFactory';
import config from './elementsData';

function Init() {
    /* This could be received dynamically */
    const dynamicElement = 'email';

    if (!(dynamicElement in config.elements)) {
        return false;
    }

    const element = Factory.createInstance(config.elements[dynamicElement]);

    element.render();
}

Init();
```

To finish, here is a representation of our folder structure after refactoring:

```
├── main.js
├── factories/
│   ├── ElementsFactory.js
└── formElements/
    ├── email.js
    ├── select.js
    └── textarea.js
```

Cool, right? Now every time you want to add a new element, it's just a matter of adding it to the `/formElements` folder and importing it in our factory so it can be instantiated, Also, if you want to remove an element, it's just a matter of deleting the import line and the file from the `/formElements` folder.

Ok, I think that's it for this article guys, and I hope you were able to understand a little more about the factory pattern. If you did, remember to share it on Twitter or Facebook. You can also subscribe to our email list below.

See you in the next one!
