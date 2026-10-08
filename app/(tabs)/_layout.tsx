import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'

export default function _layout() {
    const isAuthenticated = true; // Replace with your authentication logic

    if (!isAuthenticated) return <Redirect href="/sign-in" />;
  return (
    
      <Slot />
   
  )
}