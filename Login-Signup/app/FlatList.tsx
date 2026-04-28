import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'

export default function ScrollExample() {
  return (
    <>
      {/* 🔸 ScrollView Example */}
      {/* ScrollView me saare items ek saath render hote hain (small data ke liye best) */}
      
      <View style={{ width: '100%', height: 150, backgroundColor: 'lightgray', marginBottom: 20 }}>
        
        <ScrollView
          horizontal={true} // true karne se left-right scroll hoga
          showsHorizontalScrollIndicator={false} // scroll bar hide karne ke liye
        >
          {
            // yaha hum manually map use karke items render kar rahe hain
            [1,2,3,4,5,6,7,8,9,10].map((item) => {
              return (
                <View
                  key={item} // har item ka unique key hona chahiye
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "blue",
                    margin: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50, // circle banane ke liye (100/2)
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 20 }}>
                    {item}
                  </Text>
                </View>
              )
            })
          }
        </ScrollView>

      </View>

      {/* 🔸 FlatList Example */}
      {/* FlatList sirf visible items render karta hai (large data ke liye best) */}
      
      <FlatList

        data={[1,2,3,4,5,6,7,8,9,10]} // data array

        // list header component (optional)
        // using this we can add a header to our list
        ListHeaderComponent={() => (
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            FlatList Example
          </Text>
        )}

        // list footer component (optional)
        // using this we can add a footer to our list
        ListFooterComponent={() => (
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
            End of List
          </Text>
        )}
        
        
        // item ke ander bhi 1 obj hota h 
        // isliye { item } destructuring kiya hai 
        renderItem={({ item }) => (
          // yaha har item ka UI define hota hai
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: "blue",
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50, // % nahi chalta RN me
            }}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>
              {item}
            </Text>
          </View>
        )}

        //  yah toh grid ke form me items show kr lo yah horizontal scroll kr lo 1 sath dono `options nahi chal sakte`
        numColumns={3} // 3 columns me items ko arrange karega
        // horizontal={true} // FlatList bhi horizontal scroll kar sakta hai
        showsHorizontalScrollIndicator={false} // scroll bar hide
      />

    </>
  )
}