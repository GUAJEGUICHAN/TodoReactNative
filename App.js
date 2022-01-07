import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { logToConsole } from 'react-native/Libraries/Utilities/RCTLog';

export default function App() {
  const [text, setText] = useState("")
  const [working, setWorking] = useState(true)
  const [toDos, setTodos] = useState({})

  useEffect(() => {
    loadToDos()
  }, [])

  const loadToDos = async () => {
    const data = await AsyncStorage.getItem('@Todos');
    const loadedToDos = JSON.parse(data);
    if (loadedToDos !== null) {
      setTodos(JSON.parse(data));
    }

  }

  const saveTodos = async (toSave) => {
    try {
      await AsyncStorage.setItem('@Todos', JSON.stringify(toSave))
    } catch (err) {
      console.log(err)
    }
  }
  const deleteTodo = (key) => {
    Alert.alert("지우겠습니까?", "진짜루?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            const newTodos = { ...toDos }
            delete newTodos[key]
            setTodos(newTodos)
            saveTodos(newTodos)
          }
        }
      ]
    )
  }


  const addToDo = async () => {
    if (text === "") {
      return
    }

    const newToDos = {
      ...toDos,
      [Date.now()]: { text, work: working },
    }

    setTodos(newToDos)
    await saveTodos(newToDos)
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
              <TouchableOpacity
                onPress={() => deleteTodo(key)}>
                <Text>
                  ❌
                </Text>
              </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  toDoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }
});
