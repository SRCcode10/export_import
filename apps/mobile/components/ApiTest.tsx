import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { healthCheck, fetchUser } from '../utils/trpc';

export default function ApiTest() {
  const [health, setHealth] = useState<string>('');
  const [user, setUser] = useState<any>(null);

  const checkHealth = async () => {
    try {
      const result = await healthCheck();
      setHealth(result.status);
    } catch (error) {
      setHealth('Error: ' + error);
    }
  };

  const getUser = async () => {
    try {
      const result = await fetchUser('123');
      setUser(result);
    } catch (error) {
      setUser({ error: String(error) });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>tRPC Test</Text>
      
      <Button title="Check Health" onPress={checkHealth} />
      {health ? <Text>Health: {health}</Text> : null}
      
      <View style={styles.spacer} />
      
      <Button title="Get User" onPress={getUser} />
      {user ? <Text>User: {JSON.stringify(user)}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  spacer: {
    height: 20,
  },
});
