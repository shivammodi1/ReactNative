# 📱 React Native Modal vs React Native Modal Library

## 🧾 Introduction

In React Native, a **Modal** is used to display content in a layer above the current screen. It is commonly used for alerts, popups, forms, or dialogs.

There are two main ways to implement modals:

1. **Built-in Modal (React Native)**
2. **React Native Modal (External Library)**

---

# 🟢 1. Built-in Modal (React Native)

## 📌 Description

The built-in `Modal` component comes with React Native and is used for basic popup functionality.

## ✅ Features

* No installation required
* Simple and lightweight
* Supports basic animations (`slide`, `fade`)
* Works on both Android and iOS

## ❌ Limitations

* No backdrop click support by default
* Limited animations
* Requires more manual handling

## 💻 Example

```javascript
import { Modal, View, Text, Button } from 'react-native'
import React, { useState } from 'react'

const Example = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button title="Open Modal" onPress={() => setVisible(true)} />

      <Modal visible={visible} animationType="slide" transparent={true}>
        <View>
          <Text>Normal Modal</Text>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </Modal>
    </>
  )
}
```

---

# 🔵 2. React Native Modal (react-native-modal)

## 📌 Description

`react-native-modal` is a third-party library that provides enhanced modal features with better animations and customization.

## 📦 Installation

```bash
npm install react-native-modal
```

## ✅ Features

* Smooth and customizable animations
* Backdrop press to close
* Swipe to dismiss
* Easy to use
* Highly customizable

## ❌ Limitations

* Requires installation
* Slightly heavier than built-in modal

## 💻 Example

```javascript
import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import ReactNativeModal from 'react-native-modal'

const Example = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button title="Open Modal" onPress={() => setVisible(true)} />

      <ReactNativeModal 
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        style={{ justifyContent: 'center', alignItems: 'center' }} // isse modal center me dikhega 
        // control the position of the modal we can do over here
      >
        <View>
          <Text>React Native Modal</Text>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </ReactNativeModal>
    </>
  )
}
```

---

# ⚖️ Comparison Table

| Feature        | Built-in Modal | React Native Modal |
| -------------- | -------------- | ------------------ |
| Source         | React Native   | External Library   |
| Setup          | No install     | Requires install   |
| Animation      | Basic          | Advanced           |
| Backdrop Click | ❌             |    ✅             |
| Swipe to Close | ❌             |    ✅             |
| Customization  | Limited        | High               |
| Ease of Use    | Medium         | Easy               |

---
