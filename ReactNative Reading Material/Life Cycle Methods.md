# ⚛️ React Lifecycle Methods + `useState` (Detailed)

## 📌 Introduction

In React, components follow a **lifecycle** (Mount → Update → Unmount).
Modern React mainly uses **Functional Components + Hooks** instead of class lifecycle methods.

👉 Two important hooks:

* `useState` → for managing data (state)
* `useEffect` → for lifecycle behavior

---

# 🧠 1. `useState` (State Management)

## 🔹 What is State?

State is a **variable that stores data** and when it changes → UI re-renders.

---

## 🔹 Syntax

```js
const [state, setState] = useState(initialValue);
```

---

## 🔹 Example

```js
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increase" onPress={() => setCount(count + 1)} />
    </View>
  );
};

export default Counter;
```

---

## 🔹 Key Points

* `count` → current value
* `setCount` → update function
* Updating state → re-render automatically

---

# 🔄 2. Lifecycle using `useEffect`

Instead of class lifecycle methods, we use **`useEffect`**.

---

## 🟢 Mounting (Component Load)

```js
useEffect(() => {
  console.log("Component Mounted");
}, []);
```

👉 Runs only once (like `componentDidMount`)

---

## 🟡 Updating (State/Props Change)

```js
useEffect(() => {
  console.log("Updated");
}, [count]);
```

👉 Runs whenever `count` changes

---

## 🔴 Unmounting (Component Remove)

```js
useEffect(() => {
  return () => {
    console.log("Component Unmounted");
  };
}, []);
```

👉 Cleanup function

---

# 🔗 3. `useState` + Lifecycle Together

## 🔥 Example (Full Understanding)

```js
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const Example = () => {
  const [count, setCount] = useState(0);

  // Mount
  useEffect(() => {
    console.log("Mounted");
  }, []);

  // Update
  useEffect(() => {
    console.log("Count Updated:", count);
  }, [count]);

  // Unmount
  useEffect(() => {
    return () => {
      console.log("Unmounted");
    };
  }, []);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increase" onPress={() => setCount(count + 1)} />
    </View>
  );
};

export default Example;
```

---

# 📊 Difference: Class vs Hooks

| Feature | Class Component        | Functional Component |
| ------- | ---------------------- | -------------------- |
| State   | `this.state`           | `useState`           |
| Mount   | `componentDidMount`    | `useEffect([])`      |
| Update  | `componentDidUpdate`   | `useEffect([dep])`   |
| Unmount | `componentWillUnmount` | `useEffect cleanup`  |

---

# ⚡ Important Concepts

### 🔹 1. State is Asynchronous

```js
setCount(count + 1);
console.log(count); // old value
```

---

### 🔹 2. Functional Update

```js
setCount(prev => prev + 1);
```

---

### 🔹 3. Multiple States

```js
const [name, setName] = useState("");
const [age, setAge] = useState(0);
```

---

# 🎯 Summary

* `useState` → stores and updates data
* `useEffect` → handles lifecycle
* Lifecycle = Mount + Update + Unmount
* Modern React = Hooks (important for interviews)

---
