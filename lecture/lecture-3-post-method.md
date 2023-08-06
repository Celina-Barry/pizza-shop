---

marp: true

---

# The `POST` Method - Creating / Sending Data

---

A `POST` request is used when we want to send data or create new data on a server:

- Submitting a form to a server (i.e. logging in).
- Creating a new user in a database (i.e. signing up).
- Writing a status update.
- Online shopping.
- Etc...

---

A `POST` will contain information in its body.

How do we pass a body along with a `POST`?

---

## more on `fetch`

We saw that `fetch` expects a string as it's first argument:

```js
// GET request
fetch("<SOME_URL>")
    .then(response => response.json())
    .then((parsed) => {
        // Do something with the data.
    })
```

---

## more on `fetch`

`fetch` can also accept an `options` object as its second argument

```js
// GET request
fetch("<SOME_URL>" , {  } )
    
```

---

## `POST` Structure

The `options` object **must** contain a `key` of `body`

This is where the server will look for information

```js
const info = { name: "Bimmy", password: 1234};

// GET request
fetch("<SOME_URL>" , { 
	body: JSON.stringify(info)
	}
)
    
```

The value of this body must be a JSON string

❗ If we don't turn it into a `JSON` string, sending the data will fail (unless specified otherwise).

But that's not all...

---

## `POST` Structure

The `options` object **must** contain:

A `key` of `method`, who's `value` is `"POST"` (all in capital letters).

```js
const info = { name: "Bimmy", password: 1234};

// GET request
fetch("<SOME_URL>" , {
	method: "POST",
	body: JSON.stringify(info) 
	}
)
    
```

This is what tells the server this is a `POST` and not a `GET` (or any other method)

---

## `POST` Structure

The `options` object **must** contain:

A `key` of `headers`, who's `value` is an object that contains:
  - `"Accept": "application/json"` - This tells the server the format of the data we expect to recieve. - **Optional but recommended**.
  - `"Content-Type": "application/json"` - This tells the server the format of the data we're sending. - **Required**.

```js
const info = { name: "Bimmy", password: 1234};

// GET request
fetch("<SOME_URL>" , {
	method: "POST",
	headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
	body: JSON.stringify(info) 
	}
)
    
```

This is what tells the server this is a `POST` and not a `GET`

---

## `POST` Structure

```js
// GET request
fetch("/order-info")
    .then(response => response.json())
    .then((parsedObject) => {
        // Do something with the data response.
    })

// POST request
fetch("/order", {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "Bimmy", password: 1234})
})
    .then(response => response.json())
    .then((parsedObject) => {
        // Do something with the data response.
    })
```

---

## The Data We POST- Where does it come from?

- The data comes from the `form`! 
- A post will almost always be used with a `form`.
- Why? Because the information the user inputs into the `form` is our data!
    - See slide 2 for examples

---

## The `form`

```jsx
const Component = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            firstName,
            lastName,
            email,
            address
        }

        fetch("/signup", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((parsed) => {
                // login logic
            })
            .catch((error) => {
                window.alert(error);
            })
    }

    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="fname">First Name: </label>
            <input type="text" id="fname" onChange={(e) => handleChange(e.target.id, e.target.value)} />

            <label htmlFor="lname">Last Name: </label>
            <input type="text" id="lname" onChange={(e) => handleChange(e.target.id, e.target.value)} />

            <label htmlFor="email">Email: </label>
            <input type="text" id="email" onChange={(e) => handleChange(e.target.id, e.target.value)} />
            
            <label htmlFor="address">Address: </label>
            <input type="text" id="address" onChange={(e) => handleChange(e.target.id, e.target.value)} />

            <button type="submit">Submit</button>

        </form>
    )
}
```

❗ This works but... what if you had dozens of fields to fill?

---

## The `formData` Approach

```jsx
const Component = () => {

    const [formData, setFormData] = useState({});

    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/signup", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then((parsed) => {
                // login logic
            })
            .catch((error) => {
                window.alert(error);
            })
    }

    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="fname">First Name: </label>
            <input type="text" id="fname" onChange={(e) => handleChange(e.target.id, e.target.value)} />

            <label htmlFor="lname">Last Name: </label>
            <input type="text" id="lname" onChange={(e) => handleChange(e.target.id, e.target.value)} />

            <label htmlFor="email">Email: </label>
            <input type="text" id="email" onChange={(e) => handleChange(e.target.id, e.target.value)} />
            
            <label htmlFor="address">Address: </label>
            <input type="text" id="address" onChange={(e) => handleChange(e.target.id, e.target.value)} />

            <button type="submit">Submit</button>

        </form>
    )
}
```

❗ Now we have one state that manages all the input fields of our form!

---

So if `GET` is for reading, and `POST` is for creating and sending... What other operations can we do with `fetch`?

---

[Next lecture: Other Methods](../lecture-4-other-methods)
