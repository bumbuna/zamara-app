import * as React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export function ProfileDetailComponent({title, value}) {
  return (
    <View style={styles.container}>
      <Text style={styles.key}> {title}: </Text>
      <Text style={title === 'Email' ? styles.email: styles.value}> {value} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row'

  },
  key: {
    fontWeight: 'bold'
  },
  value : {
    fontWeight: 'light'
  },
  email: {
    textDecorationLine: 'underline',
    color: 'blue'
  }

})