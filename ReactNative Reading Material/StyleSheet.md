# StyleSheet in React Native
- It gives us a way to create styles for our components in a more organized and efficient way.
- It removes the inline styling in react native.
- We have to import StyleSheet from react native to use it.

```javascript
import { StyleSheet } from 'react-native';

<View style={style.container}>
    <Text style={style.text}>Hello, World!</Text>
</View>

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: 'blue',
    },
});
```

- Above code se hum styles create kiye gaye hain container aur text ke liye. Ab hum in styles ko apne components mein use kar sakte hain.

- *StyleSheet.create()* method ka use karke hum apne styles ko create karte hain.
- Is method se humare styles ko optimize kiya jata hai, jisse performance improve hoti hai.
- StyleSheet ke andar hum apne styles ko **ek object ke form** mein define karte hain, jisme keys style names hote hain aur values style properties hote hain.


- Orr jahan hume usse use krna hain wahan par style = {style.styleName} krna hain. 