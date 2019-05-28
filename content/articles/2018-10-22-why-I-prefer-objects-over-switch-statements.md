---
date: '2018-10-22T01:10:23.912Z'
title: 'Why I prefer objects over switch statements'
summary: 'A different approach to handle your conditions.'
series: ['Javascript']
featuredImage: '2018-10-22-objects-over-switch.png'
reddit: 'https://www.reddit.com/r/javascript/comments/arkefh/an_alternative_approach_to_switch_statements_in/'
---

Recently (or not so recently, depending on when you read this article), I was having a debate with some teammates about how to handle conditions that require multiple evaluations, usually for such cases people love to use a switch statement or a huge `if` with multiple `else if` conditions. In this article I'm going to focus on a third way (the approach I prefer), we're going to make use of objects for quick lookups.

## The switch statement

The switch statement allow us to evaluate an expression and do something especific depending on the value of the expression passed, usually when you learn to write code and algorithms you learn that you can use it specially for multiple evaluations, you start using it, it looks good and you quickly realized that it gives you a lot of freedom, yay!, but be careful, great freedom comes with great responsability.

Let's quickly see how a typical switch statement looks like:

```javascript
switch (expression) {
    case x: {
        /* Your code here */
        break;
    }
    case y: {
        /* Your code here */
        break;
    }
    default: {
        /* Your code here */
    }
}
```

Excellent, Now there are a couple of things you may not know you need to pay attention to:

### The break keyword is optional.

The break keyword allows us to stop the execution of blocks when a condition is already met. If you don't add the `break` keyword to your switch statement it wont throw an error. Having a `break` keyword missing by accident could mean executing code that you don't even know is being executed, this also adds inconsistency to our implementations, mutations, memory leaks and complexity layers when debugging problems. Let's see a representation of this problem:

```javascript
switch ('first') {
    case 'first': {
        console.log('first case');
    }
    case 'second': {
        console.log('second case');
    }
    case 'third': {
        console.log('third case');
        break;
    }
    default: {
        console.log('infinite');
    }
}
```

If you execute this piece of code in your console you'll see that the output is

```javscript
firt case
second case
third case
```

The switch statement executes the block inside the second and third case even though the first case was already the correct one, it then finds the `break` keyword in the third case block and stops the execution, no warnings or errors in the console to let you know about it, this is the desired behavior.

### The curly brackets on each case are _NOT_ mandatory.

Curly brackets represent _blocks_ of code in javascript, since _ECMAscript 2015_ we can declare blockscoped variables with the use of keyworkds like `const` or `let` which is great (but not so great for switch cases), since curly brackets are not mandatory we could get errors because of duplication of variables, let's see what happens when we execute the code below:

```javascript
switch ('second') {
    case 'first':
        let position = 'first';
        console.log(position);
        break;
    case 'second':
        let position = 'second';
        console.log(position);
        break;
    default:
        console.log('infinite');
}
```

we would get:

```
Uncaught SyntaxError: Identifier 'position' has already been declared
```

This returns an error because the variable `position` has already been declared in the first case and since it does not have curly brackets it's being
hoisted, then by the moment the second case tries to declare it, it already exists and **BOOM**.

Now imagine the things that could happen when using the switch statements with inconsistent `break` keywords and curly brackets:

```javascript
switch ('first') {
    case 'first':
        let position = 'first';
        console.log(position);
    case 'second':
        console.log(`second has access to ${position}`);
        position = 'second';
        console.log(position);
    default:
        console.log('infinite');
}
```

This will console log the following:

```
first
second has access to first
second
infinite
```

Only imagine, the amount of errors and mutations that could be introduced because of this, the possibilities are endless... Anyway, enough of switch statements, we came here to talk about a different approach, we came here to talk about objects.

## Objects for safer lookups

Object lookups are fast and they're faster as their size grow, also they allow us to represent data as key value pairs which is excelent for conditional executions.

### Working with strings

let's start with something simple like the switch examples, let's suppose we need to save and return a string conditionally, using objects we could do:

```javascript
const getPosition = position => {
    const positions = {
        first: 'first',
        second: 'second',
        third: 'third',
        default: 'infinite'
    };

    return positions[position] || positions.default;
};

const position = getPosition('first'); // Returns 'first'
const otherValue = getPosition('fourth'); // Returns 'infinite'
```

This would do the same job, if you want to compact this implementation even more, we could take even more advantage of arrow functions:

```javascript
const getPosition = position =>
    ({
        first: 'first',
        second: 'second',
        third: 'third'
    }[position] || 'infinite');

const positionValue = getPosition('first'); // Returns 'first'
const otherValue = getPosition('fourth'); // Returns 'infinite'
```

This does the exact same thing as the previous implementation, we have achieved a more compact solution in less lines of code.

Let's be a little more realistic now, not all the conditions we write will return simple strings, many of them will return booleans, execute functions and more.

### Working with booleans

I like to create my functions in a way that they return consistent types of values, but, since javascript is a dynamically typed language there could be cases in which a function may return dynamic types so I'll take this into account for this example and I'll make a function that returns a **boolean**, **undefined** or a **string** if the key is not found.

```javascript
const isNotOpenSource = language =>
    ({
        vscode: false,
        sublimetext: true,
        neovim: false,
        fakeEditor: undefined
    }[language] || 'unknown');

const sublimeState = isNotOpenSource('sublimetext'); // Returns true
```

Looks great, right?, but wait, seems like we have a problem... what would happen if we call the function with the argument `'vscode'` or `fakeEditor` instead?, mmm, let's see:

1. It'll look for the key in the object.
1. It'll see that the value of the vscode key is `false`.
1. It'll try to return `false` but since `false || 'unknown'` is `unknown` we will end up returning an incorrect value.

We'll have the same problem for the key `fakeEditor`.

Oh no, ok, don't panic, let's work this out:

```javascript
const isNotOpenSource = editor => {
    const editors = {
        vscode: false,
        sublimetext: true,
        neovim: false,
        fakeEditor: undefined,
        default: 'unknown'
    };

    return editor in editors ? editors[editor] : editors.default;
};

const codeState = isNotOpenSource('vscode'); // Returns false
const fakeEditorState = isNotOpenSource('fakeEditor'); // Returns undefined
const sublimeState = isNotOpenSource('sublimetext'); // Returns true
const webstormState = isNotOpenSource('webstorm'); // Returns 'unknown'
```

And this solves the issue, but... I want you to ask yourself one thing: was this really the problem here? I think we should be more worried about why we needed a function that returns a `boolean`, `undefined` or a `string` in the first place, that's some serious inconsistency right there, anyway, this is just a possible solution for a very edgy case.

### Working with functions

Let's continue with functions, often we find ourselves in a position where we need to execute a function depending on arguments, let's suppose we need to parse some input values depending on the type of the input, if the parser is not registered we just return the value:

```javascript
const getParsedInputValue = type => {
    const emailParser = email => `email,  ${email}`;
    const passwordParser = password => `password, ${password}`;
    const birthdateParser = date => `date , ${date}`;

    const parsers = {
        email: emailParser,
        password: passwordParser,
        birthdate: birthdateParser,
        default: value => value
    };

    return parsers[type] || parsers.default;
};

// We select the parser with the type and then passed the dynamic value to parse
const parsedEmail = getParsedInputValue('email')('myemail@gmail.com'); // Returns email, myemail@gmail.com
const parsedName = getParsedInputValue('name')('Enmanuel'); // Returns 'Enmanuel'
```

If we had a similar function that returns another functions but without parameters this time, we could improve the code to directly return when the first function is called, something like:

```javascript
const getValue = type => {
    const email = () => 'myemail@gmail.com';
    const password = () => '12345';

    const parsers = {
        email,
        password,
        default: () => 'default'
    };

    return (parsers[type] || parsers.default)(); // we immediately invoke the function here
};

const emailValue = getValue('email'); // Returns myemail@gmail.com
const passwordValue = getValue('name'); // Returns default
```

## Common Code Blocks

Switch statements allows us to define common blocks of code for multiple conditions.

```javascript
switch (editor) {
    case 'atom':
    case 'sublime':
    case 'vscode':
        return 'It is a code editor';
        break;
    case 'webstorm':
    case 'pycharm':
        return 'It is an IDE';
        break;
    default:
        return 'unknown';
}
```

How would we approach this using objects?, we could do it in the next way:

```javascript
const getEditorType = type => {
    const itsCodeEditor = () => 'It is a code editor';
    const itsIDE = () => 'It is an IDE';

    const editors = {
        atom: itsCodeEditor,
        sublime: itsCodeEditor,
        vscode: itsCodeEditor,
        webstorm: itsIDE,
        pycharm: itsIDE,
        default: () => 'unknown'
    };

    return (editors[type] || editors.default)();
};

const vscodeType = getEditorType('vscode'); // Returns 'It is a code editor'
```

And now we have an approach that:

1. Is more structured.
1. Scales better.
1. Is easier to maintain.
1. Is easier to test.
1. Is safer, has less side effects and risks.

## Things to take into consideration

As expected all approaches have their downfalls and this one is not exception to the rule.

1. Since we're using objects we will be taking some temporal space in memory to store them, this space will be freed thanks to the garbage collector when the scope in which the object was defined is no longer accesible.

1. Objects approach could be less fast than switch statements when there are not many cases to evaluate, this could happen because we're creating a data structure and later accesing a key where in the switch we're just checking values and returning.

## Conclusion

This article does not intend to change your coding style or make you stop using switch statements, it just tries to raise awareness so it can be used correctly and also open your mind to explore new alternatives, in this case I have shared the approach I like to use but there are more, for example, you may wanna take a look to a ES6 proposal called [pattern matching](https://github.com/tc39/proposal-pattern-matching), if you don't like it you can keep exploring.

OK devs of the future, that was it, I hope you enjoyed the article, if you did, you will probably like [this article about factory pattern](https://enmascript.com/articles/2018/10/05/javascript-factory-pattern) as well. Also, don't forget to share it and suscribe, you can find me on [twitter](https://twitter.com/duranenmanuel) or contact me through my email <duranenmanuel@gmail.com>, see you in the next one.
