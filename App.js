import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Text from './Text';
import config from './config';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(
      `${config.supabase.url}/articles?select=*,users(*)&order=created_at.desc.nullslast`,
      {
        headers: {
          apikey: config.supabase.apiKey,
        },
      },
    )
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoaded(true);
      });
  }, [loaded]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View>
          {!loaded ? (
            <Text>Loading</Text>
          ) : (
            articles.map(article => (
              <View key={article.id} style={styles.article}>
                <Text style={styles.date}>
                  {new Date(article.created_at).toDateString()}
                </Text>
                <Text style={styles.author}>@{article.users.username}</Text>
                <Text style={styles.title}>{article.title}</Text>
                <View style={styles.divider} />
                <Text style={styles.body}>{article.body}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#121212',
    color: 'white',
  },
  article: {
    backgroundColor: '#1d1d1d',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  divider: {
    backgroundColor: 'white',
    opacity: 0.3,
    height: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
  },
  date: {
    opacity: 0.7,
  },
  author: {
    marginTop: 5,
    marginBottom: 5,
    opacity: 0.5,
  },
  body: {
    color: 'white',
  },
});
