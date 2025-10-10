import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const signIn = () => {
  return (
    <View>
      <Text>sign-in</Text>
      <Button title='Sign In' onPress={() => router.push('/sign-up')} />
    </View>
  )
}

export default signIn