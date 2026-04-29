# 📱 React Native: ScrollView vs FlatList (Complete Notes)

---

## 🔹 Introduction

React Native me jab hume **multiple items ya content display karna hota hai**, tab hum mainly do components use karte hain:

- ScrollView  
- FlatList  

👉 Dono scrolling ke liye use hote hain, lekin **performance aur use-case different hote hain**.

---

# 🔸 ScrollView

## ✅ Definition  
ScrollView ek basic component hai jo **saare items ek saath render karta hai**.

## ⚙️ Working  
- Saara data ek hi baar memory me load hota hai  
- Default scroll → vertical hota hai  
- `horizontal={true}` se left-right scroll hota hai  

---

## ✅ Pros  
- Simple aur easy to use  
- Small UI / forms ke liye best  
- Static content ke liye useful  

## ❌ Cons  
- Large data me slow ho jata hai  
- High memory usage  
- Performance issue (lag ho sakta hai)  

---

## 💻 Example  

```jsx
import { ScrollView, View, Text } from 'react-native';

<ScrollView>
  {[1,2,3,4,5].map((item) => (
    <View key={item}>
      <Text>{item}</Text>
    </View>
  ))}
</ScrollView>

```
---
# 🔸 FlatList

## ✅ Definition
FlatList ek optimized component hai jo **sirf visible items render karta hai**.

## ⚙️ Working
- Data ko chunks me load karta hai
- Default scroll → vertical hota hai
- `horizontal={true}` se left-right scroll hota hai
- `numColumns` se grid layout me items arrange kar sakte hain
- `ListHeaderComponent` aur `ListFooterComponent` se header/footer add kar sakte hain

## ✅ Pros
- Large data ke liye best
- Memory efficient
- Smooth scrolling experience
- Grid layout support
- Header/Footer support

## ❌ Cons
- Thoda complex setup
- Simple static content ke liye overkill
- Customization thoda difficult ho sakta hai
## 💻 Example

```jsx
import { FlatList, View, Text } from 'react-native';
<FlatList
  data={[1,2,3,4,5]}
  keyExtractor={(item) => item.toString()}
  renderItem={({ item }) => (
    <View>
      <Text>{item}</Text>
    </View>
  )}
  numColumns={2}
  ListHeaderComponent={() => (
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
      FlatList Example
    </Text>
  )}
  ListFooterComponent={() => (
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
      End of List
    </Text>
  )}
    showsHorizontalScrollIndicator={false}
/>
```
---

