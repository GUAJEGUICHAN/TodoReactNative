import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function App() {
  const [text, setText] = useState("")
  const [working, setWorking] = useState(true)
  const [toDos, setTodos] = useState({})

  const addToDo = () => {
    setTodos({
      ...toDos,
      [Date.now()]: { text, work: working }
    })
    setText('')
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={{
            ...styles.btnText,
            color: working ? 'white' : 'grey'
          }}
            onPress={() => setWorking(true)}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{
            ...styles.btnText,
            color: working ? 'grey' : 'white'
          }} onPress={() => setWorking(false)}>Travel</Text>
        </TouchableOpacity>
      </View>
      <View
        style={styles.input}>
        <TextInput
          onSubmitEditing={addToDo}
          placeholder="useless placeholder"
          onChangeText={setText}
          value={text}
          style={{
            // paddingHorizontal: 40,
            height: 40,
            backgroundColor: 'white',
            // paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 20,
          }}
          keyboardType='default'
          returnKeyType='done'
        />
      </View>
      <ScrollView>
        {Object.keys(toDos).map(key => (
          toDos[key].work === working ?
            <View style={styles.toDo} key={key}>
              <Text
                style={styles.toDoText}
              >
                {toDos[key].text}
              </Text>
            </View> :
            null
        ))}

      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnText: {
    // fontFamily: '',
    color: "white",
    fontSize: 50,
    fontWeight: 'normal'
  },
  input: {
    marginVertical: 20,

  },
  toDo: {
    backgroundColor: 'gray',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  toDoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }
});
