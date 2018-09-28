---
date: '2018-09-26T17:12:33.962Z'
title: 'Another approach to media queries with the power of Sass'
summary: 'Learn about how media queries can make your development process faster and more efficient by using them correctly...'
series: 'CSS, Styling and Preprocessors'
featuredImage: 'media_queries_mixins_sass.png'
---

When you've been working developing websites and layouts [as long as I've been](https://enmascript.com/articles/2018/06/27/most-important-things-i-have-learned-after-10-years-as-a-software-developer), you learn one thing, _having dynamic not defined breakpoints and media queries is not a good idea_, why?, because they give you more problems than they solve... take a look at the following code for instance:

```css
.wrapper {
    margin: 0 -15px;
}

@media screen and (min-width: 420px) and (max-width: 835px) {
    .wrapper {
        margin: 0 -5px;
    }
}

@media screen and (min-width: 836px) and (max-width: 1130px) {
    .wrapper {
        margin: 0;
    }
}
```

Oh dear...

## The Problem

There are many bad things going on in the example above:

1. It has hacky/ackward breakpoints and media queries.
2. It's not clear what screen or devices each media query is covering.
3. It generates inconsistencies and issues that are hard to fix and often require a hacky solution.
4. Many other things... _(Sorry for this painful example...)_

## A step in the good direction

If you are as terrified as I am of finding code similar to the one above in a code base, it means that you're good and that you have had enough of that pain in your life as a developer (which means that it's time to move on), the first thing you do is think about _how to organize your media quieries?_, _what standard to use?_, if you're developing a personal project you may have googled _"what are the most important breakpoints that a website should cover?_", (not that I did this in the past, _winking face_). The answer to this questions is not always straightforward, it really depends on what you are building and on identifying which are the most important sources of traffic/income for your site/business. A couple of the most popular approches are to divide your media queries by **screen sizes**:

-   _Extra small, small, medium, large._

**or a combination of the most popular devices:**

-   _Phone, Tablet, Desktop, Large Desktop..._

It's ok to choose any approach that suits you _as long as it's consistent and scales_, in Sass we could assign values to these combinations by using _variables_, something like:

```scss
$xs: 480px;
$sm: 768px;
$md: 992px;
$lg: 1200px;
```

or

```scss
$phone: 480px;
$tablet: 768px;
$desktop: 992px;
$large-desktop: 1200px;
```

This isn't bad, it allows us to create more verbose and consistent media queries such as:

```scss
@media screen and (min-width: $phone) and (max-width: $tablet - 1px) { ... }
```

which is ok, notice how we're substracting `1px` from `max-width: $tablet`, the reason behind it is simple, if we use `min-width: $tablet` and we do not substract the `1px` from the `max-width` one of the media queries will overlap because both are sharing one breakpoint `(768px)`.

As I said, this approach is good but there is one thing, you'll still need to write all the media query statement for each case, including the -1px.

## A Better approach to media queries with the power of SASS and mixins

Now that we know and understand the basics of good media queries, **allow me to introduce you to a very powerful and flexible approach**, we're going to start by showing the implementation, it looks a little complicated but believe me, **using it is as easy as pie** (if you want to start by reading the explanation first you can skip this block of code and come back later):

```scss
$devices: (
    phone: 480px,
    tablet: 768px,
    desktop: 992px,
    large-desktop: 1200px
);

@mixin min-device($device: map-get($devices, 'phone')) {
    @if map-has-key($devices, $device) {
        @media screen and (min-width: map-get($devices, $device)) {
            @content;
        }
    }
}

@mixin max-device($device: map-get($devices, 'phone')) {
    @if map-has-key($devices, $device) {
        @media screen and (max-width: map-get($devices, $device) - 1) {
            @content;
        }
    }
}

@mixin only-device($device: map-get($devices, 'phone')) {
    @if map-has-key($devices, $device) {
        $devices-length: length($devices);
        $map-list: map-keys($devices);

        @if index($map-list, $device) == $devices-length {
            @include min-device($device) {
                @content;
            }
        } @else {
            $next-device-index: index($map-list, $device) + 1;
            $next-device-key: nth($map-list, $next-device-index);

            @media screen and (min-width: map-get($devices, $device)) and (max-width: map-get($devices, $next-device-key) - 1) {
                @content;
            }
        }
    }
}

@mixin between-devices(
    $min-device: map-get($devices, 'phone'),
    $max-device: map-get($devices, 'tablet')
) {
    @if map-has-key($devices, $min-device) and
        map-has-key($devices, $max-device)
    {
        @media screen and (min-width: map-get($devices, $min-device)) and (max-width: map-get($devices, $max-device) - 1) {
            @content;
        }
    }
}
```

This approach will allow us to express media queries and breakpoints using a very simple and verbose approach, **here is how you'd use it**:

```scss
/* To apply to devices with a higher screen than phone */
@include min-device("phone") { ... }

/* To apply to devices with screen sizes smaller than tablet */
@include max-device("tablet") { ... }

/* To apply to only desktop devices */
@include only-device("desktop") { ... }

/* To apply to devices in a range, in this case, between tablet"and large-desktop */
@include between-devices("tablet", "large-desktop") { ... }
```

No need to substract values from breakpoints everytime, no need to write long statements, no unnecessary redundancies, just an easy, understandable and smooth syntax, _BOOM!_

### Explaining the code

Alright, here comes the fun part, it's time to explain the code piece by piece:

```scss
$devices: (
    phone: 480px,
    tablet: 768px,
    desktop: 992px,
    large-desktop: 1200px
);
```

First, we're using the power of _Sass maps_ to store our values instead of _variables_, it's very similar to the _variables_ example, the reason why we're using _maps_ here is to make validations and execute processes more easily , we'll see more about it in the next piece of code.

```scss
@mixin min-device($device: map-get($devices, 'phone')) {
    @if map-has-key($devices, $device) {
        @media screen and (min-width: map-get($devices, $device)) {
            @content;
        }
    }
}
```

Here we're creating a mixin as a `min-width` handler, we're taking a parameter and validating that the parameter exists in the `$devices` _map_ created at the beginning, we're using the very convenient `map-has-key` _function_ to do this (one of the reasons why I used maps), then we're basically adding the content inside the media query with `@content`, we're doing the same for the `max-device`, `only-device`, `between-devices` mixins, the only real differences between them are:

-   **max-device**: substract 1px from the breakpoint passed to avoid the overlapping of properties.
-   **only-device**: limits the media query in a range where the parameter passed is defined as the `min-width` and the `max-width` is the next key that follows in the _map_ structure, **example**:

```scss
@include only-device("phone") { ... }.
```

is the same as:

```scss
@media screen and (min-width: $phone) and (max-width: $tablet - 1px) { ... }
```

-   **between-devices**: limits the media query in a range using the first parameter as `min-width` and the second one as the `max-width` (substracting 1px from the `max-width` as well).

As you can see this approach has **many advantages**:

1. **The code is simple and easy to read:** You instantly understand what is happening in the code.
1. **The current scope is clear:** It's easy to indentify the code for a given device or screen size.
1. **It's very flexible:** If you don't like the _devices_ approach you could use _screen sizes_ or your own style.
1. **Scales well:** The implementation is encapsulated in a single file, if you need to make a change on a given breakpoint or add a new one its just a matter of modifying its value or adding the new one to the _map_ structure.

Ok my dear developers I think that's it _for now_, I hope I was able to help you understand a bit more about media queries and breakpoints on CSS and SASS, sharing this approach with you is very exciting for me, if you have any comments about it you can send them over to <duranenmanuel@gmail.com> or on twitter [@duranenmanuel](https://twitter.com/duranenmanuel).

See you in the next one.
