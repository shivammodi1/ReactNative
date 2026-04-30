import { View, Text, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, Image, Linking } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Animated } from 'react-native';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const NEWS_API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;

  const categories = [
    { id: 'general', name: 'General', icon: 'newspaper-outline' },
    { id: 'business', name: 'Business', icon: 'business-outline' },
    { id: 'technology', name: 'Tech', icon: 'hardware-chip-outline' },
    { id: 'entertainment', name: 'Entertainment', icon: 'film-outline' },
    { id: 'sports', name: 'Sports', icon: 'basketball-outline' },
    { id: 'science', name: 'Science', icon: 'flask-outline' },
    { id: 'health', name: 'Health', icon: 'medkit-outline' },
  ];

  const fetchNews = async (category = 'general', isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      
      // Use different endpoints for world news
      const endpoints = [
        `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=30&apiKey=${NEWS_API_KEY}`,
        `https://newsapi.org/v2/top-headlines?sources=bbc-news,cnn,al-jazeera-english&pageSize=20&apiKey=${NEWS_API_KEY}`,
      ];
      
      // Fetch from multiple sources for world coverage
      const responses = await Promise.all(endpoints.map(url => fetch(url)));
      const data = await Promise.all(responses.map(res => res.json()));
      
      // Combine and deduplicate articles
      let allArticles = [];
      data.forEach(result => {
        if (result.status === 'ok' && result.articles) {
          allArticles = [...allArticles, ...result.articles];
        }
      });
      
      // Remove duplicates based on title
      const uniqueArticles = Array.from(
        new Map(allArticles.map(article => [article.title, article])).values()
      );
      
      setNews(uniqueArticles);
      
      // Animate news section
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
      
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews(selectedCategory, true);
  };

  const changeCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchNews(categoryId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getCountryFlag = (sourceName) => {
    const flags = {
      'CNN': '🇺🇸',
      'BBC': '🇬🇧',
      'Al Jazeera': '🇶🇦',
      'Fox': '🇺🇸',
      'The Guardian': '🇬🇧',
      'Reuters': '🇬🇧',
      'Associated Press': '🇺🇸',
      'Bloomberg': '🇺🇸',
      'Sky News': '🇬🇧',
      'NDTV': '🇮🇳',
      'The Times of India': '🇮🇳',
      'Al Arabiya': '🇦🇪',
    };
    for (const [key, flag] of Object.entries(flags)) {
      if (sourceName.includes(key)) return flag;
    }
    return '🌍';
  };

  const NewsCard = ({ article, index }) => {
    const scaleAnim = useRef(new Animated.Value(0.95)).current;
    
    useEffect(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          marginHorizontal: 15,
          marginBottom: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => article.url && Linking.openURL(article.url)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.08)']}
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.2)',
            }}
          >
            {/* Image Section */}
            {article.urlToImage && (
              <Image
                source={{ uri: article.urlToImage }}
                style={{
                  width: '100%',
                  height: 200,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }}
                resizeMode="cover"
              />
            )}
            
            {/* Content Section */}
            <View style={{ padding: 15 }}>
              {/* Source and Time */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 }}>
                <Text style={{ fontSize: 20 }}>{getCountryFlag(article.source?.name || '')}</Text>
                <Text style={{
                  color: '#38bdf8',
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                  {article.source?.name || 'News Source'}
                </Text>
                <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: 'rgba(255,255,255,0.4)' }} />
                <Text style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 11,
                }}>
                  {formatDate(article.publishedAt)}
                </Text>
              </View>
              
              {/* Title */}
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: 8,
                lineHeight: 24,
              }}>
                {article.title}
              </Text>
              
              {/* Description */}
              {article.description && (
                <Text style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 20,
                  marginBottom: 12,
                }}
                numberOfLines={2}
                >
                  {article.description}
                </Text>
              )}
              
              {/* Read More Link */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Text style={{
                  color: '#38bdf8',
                  fontSize: 13,
                  fontWeight: '600',
                }}>
                  Read more
                </Text>
                <Feather name="arrow-right" size={14} color="#38bdf8" />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <LinearGradient
      colors={['#0f172a', '#1e293b']}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{
          paddingTop: 50,
          paddingHorizontal: 15,
          paddingBottom: 15,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 }}>
            <MaterialCommunityIcons name="newspaper-variant" size={32} color="#38bdf8" />
            <Text style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#fff',
            }}>
              World News
            </Text>
          </View>
          
          {/* Categories ScrollView */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 0 }}
            contentContainerStyle={{ gap: 10 }}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => changeCategory(category.id)}
                style={{
                  backgroundColor: selectedCategory === category.id 
                    ? '#38bdf8' 
                    : 'rgba(255,255,255,0.1)',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Ionicons 
                  name={category.icon} 
                  size={16} 
                  color={selectedCategory === category.id ? '#fff' : '#38bdf8'} 
                />
                <Text style={{
                  color: selectedCategory === category.id ? '#fff' : '#38bdf8',
                  fontSize: 14,
                  fontWeight: '500',
                }}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* News List */}
        {loading && !refreshing ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#38bdf8" />
            <Text style={{ color: '#fff', marginTop: 15, fontSize: 16 }}>
              Loading latest news...
            </Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#38bdf8"
                colors={['#38bdf8']}
              />
            }
            contentContainerStyle={{
              paddingVertical: 15,
              paddingBottom: 30,
            }}
          >
            {news.length > 0 ? (
              news.map((article, index) => (
                <NewsCard key={`${article.title}-${index}`} article={article} index={index} />
              ))
            ) : (
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 100,
              }}>
                <Ionicons name="sad-outline" size={64} color="rgba(255,255,255,0.5)" />
                <Text style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 16,
                  marginTop: 15,
                  textAlign: 'center',
                }}>
                  No news available
                  {'\n'}Pull down to refresh
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </LinearGradient>
  );
};

export default News;