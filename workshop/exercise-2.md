# Exercise 2 - Pick your ~~Poison~~ Pizza!

No poison here, I promise! 😇

Now that you have a main menu, let create a pizza details page!

Wrap the pizza's information from the previous exercise in a `Link` and make it send the user to the `"/pizza/:pizzaId"` `Route` (which does not exist... yet 😉). Oh and create a `PizzaDetails` component that will be rendered by that `Route`.

In the `PizzaDetails` component you need to:
1. Grab the `pizzaId` from the URL.
2. Use it to `fetch` the details of the pizza selected by the user.
3. Display all of the pizza's information on the whole page.
4. Add a little link that will redirect the user to the order page (used in the next exercise).

> PS: Don't forget your loading state!

It should look a little something like this (but less ugly):

![ex2_screenshot](../lecture/assets/ex2.png)

---

Remember to look at the [API Documentation](../server/API_DOC.md) to figure out what address you need to `fetch`!

[Previous Exercise](./exercise-1.md)

[Back to the README.md](../README.md)

[Next Exercise](./exercise-3.md)