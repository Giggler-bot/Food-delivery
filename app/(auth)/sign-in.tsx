import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';

// ⭐ Import your Appwrite sign-in function
import { signIn } from '@/lib/appwrite';

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async () => {
    const { email, password } = form;

    if (!email || !password) {
      return Alert.alert('Error', 'Please enter a valid email and password');
    }

    setIsSubmitting(true);

    try {
      await signIn({ email, password }); // <-- FIXED
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error?.message ?? 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
        label="Password"
        secureTextEntry={true}
      />

      <CustomButton
        title="Sign In"
        isLoading={isSubmitting}
        onPress={submit}
      />

      <View className="flex justify-center mt-5 gap-2 flex-row">
        <Text className="text-gray-500">
          Don’t have an account?
        </Text>
        <Link href="/sign-up" className="font-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
