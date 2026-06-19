import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  ActivityIndicator, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';

const API_URL = "https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPOSITORIO/main/db.json";

export default function App() {
  const [selecoes, setSelecoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setSelecoes(data);
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados: ", error);
        setCarregando(false);
      });
  }, []);

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.bandeira }} style={styles.bandeira} />
      <View style={styles.infoContainer}>
        <Text style={styles.nomeSelecao}>{item.selecao}</Text>
        <Text style={styles.grupo}>{item.grupo}</Text>
        <Text style={styles.titulos}>🏆 {item.titulos} títulos</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3d59" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏆 Dashboard da Copa</Text>
      </View>

      {carregando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffc13b" />
          <Text style={styles.loadingText}>Carregando seleções...</Text>
        </View>
      ) : (
        <FlatList
          data={selecoes}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1e3d59',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#ffc13b',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    // Sombra para Android e iOS
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bandeira: {
    width: 80,
    height: 50,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  infoContainer: {
    marginLeft: 20,
    flex: 1,
  },
  nomeSelecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3d59',
  },
  grupo: {
    fontSize: 14,
    color: '#17b978',
    fontWeight: '600',
    marginTop: 2,
  },
  titulos: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#1e3d59',
    fontSize: 16,
  },
});

