---
date: '2021-04-04T08:10:30.962Z'
title: 'Understanding Singly Linked Lists and some of their uses'
summary: "Linked Lists are a fundamental data structure in the world of software development, in this article we will explore its implementation and its applications in today's world"
series: ['Data Structures and Algorithms']
featuredImage: '2021-04-07-linked-lists.png'
---

## Definition

Linked Lists are a fundamental data structure used to store information linearly, this information is not stored in contiguous places in memory rather linked lists use a pointer in each node that links to the next node that is stored.

A node in a linked list could be represented as follows:

![](/images/2021-04-03-singly-linked-list-node.svg#image-type=no-border;width=auto)

which in code could be represented as:

```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
```

Allowing us to create a new node like:

```javascript
const node = new Node('Node value');
```

As already stated each of these nodes contains data that is stored in `this.value` and has a direct reference to the next node in line through `this.next`, the first node of the linked list is usually referred to as the <mark>Head</mark> and the last node is called <mark>Tail</mark>, since the Tail is always the last node the value of its `this.next` property will always be `null` for singly linked lists.

![](/images/2021-04-03-singly-linked-list.svg#image-type=no-border)

So if we try to represent that in code we get something close to:

```javascript
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
}
```

## 1. Appending nodes to a linked list

Let's start by creating a linked list API, we already know how to represent a node and we know the basics, we know how we will represent the head and the tail, so we can start to define how we will append new nodes to the linked list, for this we need to consider that:

1. If not head is defined the new node should be defined as the head and also the tail.
2. If the head is defined we add the new node to the current tail's `next` property and we define the new node as the tail.

```javascript{9-29}
import Node from './LinkedListNode';

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(value) {
        // We create a new Node
        const node = new Node(value);

        if (!this.head) {
            // If not head is define we define it alongside with the tail
            this.head = node;
            // We  define the tail
            this.tail = node;

            return this;
        }

        // If the head is defined we attach the new node to the
        // tail's next property
        this.tail.next = node;
        // We make the new node the tail
        this.tail = node;

        return this;
    }
}
```

So now if we call append like:

```javascript
const linkedList = new LinkedList();

linkedList.append(1)
linkedList.append(2)
linkedList.append(3)
```

We would get this result:

![](/images/2021-04-04-singly-linked-list-value.svg#image-type=no-border)

and if we do something like `console.log(linkedList)` you will get a result like:

```javascript
{
    "head": {
        "value": 1,
        "next": {
            "value": 2,
            "next": {
                "value": 3,
                "next": null
            }
        }
    },
    "tail": {
        "value": 3,
        "next": null
    }
}
```

This is excellent, you can see how the nodes connect with each other, they are just objects connected to each other through their `next` property.

### 1.1. Time complexity for Appending nodes to a linked list

Appending an element to the end of the linked list requires us to modify the tail's `next` property and reassign the tail with the value of the new node.

this is true for any node we want to append which makes this <mark>a constant **O(1)** operation</mark>.

![](/images/2021-04-06-alg-o-1-complexity.svg#image-type=no-border-limied-width;)

## 2. Prepending nodes to a linked list

Prepending a node is simpler since we already have the `head` of the list stored, the only thing we need to do is assign the new node as the head of the list and define its `next` property with a reference to the previous head Node.

```javascript{4-8}
class LinkedList {
    ...

    prepend(element) {
        const previousHead = this.head;
        this.head = new Node(element);
        this.head.next = previousHead;
    }
}
```
### 2.1. Time complexity for prepending nodes

It does not matter how many nodes the linked list has, it will always be the same process and complexity for prepending hence <mark>the time complexity of prepending is constant **O(1)**</mark>.

![](/images/2021-04-06-alg-o-1-complexity.svg#image-type=no-border-limied-width;)

## 3. Accessing and Searching nodes

The only way to access and search an element in a given linked list is through the iteration of the `next` property of all the nodes that come before the node we are looking for, it is important to note that if the element we are searching or trying to access is not found this would still require us to go through all the nodes in the list.

```javascript{3,17}
class LinkedList {
    ...

    find(value) {
        if (!this.head || value === undefined) {
            return null;
        }

        let currentNode = this.head;

        while(currentNode) {
            if (currentNode.value === value) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }
}
```

i.e let's find the node 3 in the linked list below:

![](/images/2021-04-05-singly-linked-list-find.svg#image-type=no-border)



### 3.1. Time complexity of accessing and searching nodes

Knowing this we can stablish that accessing and searching an element would be <mark>**O(n)** where **n = number of nodes in the list**</mark>, even though we don't always search the whole list the big O notation analizes algorithms by their trend and worst case scenario and so we arrive at this conclusion.

![](/images/2021-04-06-alg-o-n-complexity.svg#image-type=no-border-limied-width;)

## 4. Removing nodes from a linked list

Great, now as you can imagine, removing elements from a linked list is pretty straight forward:

1. Check if the node we want to remove is currently the head of our linked list, if so, we just remove the reference to such node by making `this.head` be the next node in line (since now there is no reference to the node with value 1 it will be garbage collected and removed):

![](/images/2021-04-05-singly-linked-list-remove-head.svg#image-type=no-border)

2. If the node to remove is not the head, we iterate over the nodes until the node to remove is found, if the node is not found we don't do anything.

3. Once the node to remove is found we get the node previous to that one, we then modify this previous node's  `next` property so that it points to the node that comes after the node to remove, in this way the reference to the node to be removed is lost and it can be garbage collected hence the node is _removed_ from the linked list.

let's see how this would look in the code:

```javascript{4-38}
class LinkedList {
    ...

    remove(value) {
        if (!this.head || value === undefined) {
            return null;
        }

        let nodeToRemove = null;

        // Check if the node to remove is the head node
        if (this.head.value === value) {
            // We save the node just to return it later
            nodeToRemove = this.head;
            // If the node is the head we remove the node by assigning
            // the second node as the head.
            this.head = this.head.next;
        } else {
            // currentNode will be used to iterate over the nodes
            let currentNode = this.head;

            // We iterate over the nodes until there are no more nodes left to search
            // or until we find the node to remove
            while(currentNode.next !== null) {
                if (currentNode.next.value === value) {
                    // We save the node just to return it later
                    nodeToRemove = currentNode.next;
                    // If we find the node we remove it as explained on point 4.
                    currentNode.next = currentNode.next.next;
                } else {
                    // If the node has not been found we continue searching
                    currentNode = currentNode.next;
                }
            }
        }

        return nodeToRemove;
    }
}
```

Let's say we want to remove the node that contains the value 2, we would ideally do this by calling the method remove like:

```javascript
linkedList.remove(2)
```

Which would modify the reference from the node with value 1 to be now the reference of the node with value 3, in this way node 2 is left out:

![](/images/2021-04-04-singly-linked-list-remove.svg#image-type=no-border)

### 4.1. Time complexity for Deleting a node (From the beginning / Head node)

Deleting a node from the beginning of the list as [previously seen](#removing-nodes-from-a-linked-list) just requires us to change the `this.head` value to be `this.head.next` in this way we remove the reference to the first node, since this operation is constant no matter the size of the list it is considered <mark>**O(1)**</mark>.

![](/images/2021-04-06-alg-o-1-complexity.svg#image-type=no-border-limied-width;)

### 4.2. Time complexity for Deleting the Tail or any node that's not the head

Doing this will require us to iterate over the list until we find the element to delete ([Same that we need to search an node](#accessing-and-searching-element)), then we just remove the node as usual so the time complexity would be <mark>**O(n)** where **n = number of nodes in the list**</mark>.

![](/images/2021-04-06-alg-o-n-complexity.svg#image-type=no-border-limied-width;)


## Space Complexity of linked lists

The space required for a linked list is directly correlated with the number of nodes that it holds, this means that the more nodes we have the more space we use and this grows linearly per node which makes linked lists <mark>**O(n)** for Space complexity.</mark>

## Use cases and why to learn about them

Most of the cases where linked lists shine come in situations where we need to insert or delete multiple nodes, in these cases linked lists perform at a constant time which makes them ideal, also since linked list's space grows linearly we can also leverage their dynamic memory allocation in ocassions where we lack memory.

Another important point is that there are other structures that are and can be built with linked lists as a base, one good example are queues (That we will analyze later in another article)

Hope this article helped you understand linked lists a little.


