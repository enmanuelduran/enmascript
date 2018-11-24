---
date: "2018-07-09T17:12:33.962Z"
title: "Short-circuiting for faster evaluations"
summary: "Short-circuiting is just a fancy name we use to describe the interruption of conditional statements due to the fullfillment of truth table evaluations."
series: ["Javascript"]
featuredImage: "2018-07-09-short-circuiting.png"
---



Before talking about Short-circuiting let’s have a quick reminder about boolean expressions, here a quick table I made to help you “Refresh” your memory:
<table class="tg">
<tbody>
<tr>
<th>A</th>
<th>B</th>
<th>A <u>AND</u> B</th>
<th>A <u>OR</u> B</th>
</tr>
<tr class="alt">
<td><strong>True</strong></td>
<td><strong>False</strong></td>
<td><strong>False</strong></td>
<td><strong>True</strong></td>
</tr>
<tr>
<td><strong>False</strong></td>
<td><strong>True</strong></td>
<td><strong>False</strong></td>
<td><strong>True</strong></td>
</tr>
<tr class="alt">
<td><strong>True</strong></td>
<td><strong>True</strong></td>
<td><strong>True</strong></td>
<td><strong>True</strong></td>
</tr>
<tr>
<td><strong>False</strong></td>
<td><strong>False</strong></td>
<td><strong>False</strong></td>
<td><strong>False</strong></td>
</tr>
</tbody>
</table>

Memory refreshed?, I know I know, most of you probably knew this already, but hey, I had to take precautions, excellent! Now we’re finally ready to start talking about the real thing.


Let’s take the following statement:

```javascript

const animal = false;
const sound = 'woof';

if (sound === 'woof' && animal) {
    const dog = true;
}
```

If we analyze the expression above we’ll see that it’s making use of the && (_AND_) operator, which means that all statements englobing the condition must be  _true_in order for the expression to be  _true._ I want you to pay attention to the way you evaluate the condition above, we first evaluate  `sound === 'woof'`  and then `animal`  which means that we evaluate conditions L -> R (_left to right_ ), this is very basic but very important to understand.

**Short-circuit** _means that statements are evaluated L -> R and tested in this order to avoid evaluating complete statement when possible_, so basically:

`false && anything`  is short-circuit evaluated to false

`true || anything` is short-circuit evaluated to true

Not clear yet?, let me enlight you based on the example above but switching the conditional arguments:

```javascript
const animal = false;
const sound = 'woof';

// The if statement is short-circuit evaluated to false
if (animal && sound === 'woof') {
    const dog = true;
}
```

The condition above will end up being false because  `animal` is false, this means that we don’t evaluate `sound === 'woof'` because we already know the condition is false **which means that this condition has been short-circuit evaluated to false.** That’s it, that is the essence of short-circuiting.

Still don’t see what is the advantage of knowing this?, Based on the concepts we’ve learned, we can improve our conditions and always evaluate the most important parameters in our conditions first, always evaluate first the variables you know are most likely to define your statements so that it can have more chances to be “short-circuited”, keep this in mind from now on and you’ll be making some small but good improvements to your application.




Did you like the article? in our previous article [Ternary operators and boolean assignations](https://enmascript.com/articles/2018/07/07/ternary-operators-and-boolean-assignations)  we covered a topic that could be very helpful if combined with what we’ve learned today, don’t forget to share it with your friends and support us by subscribing to our email list, see you in the next one.
