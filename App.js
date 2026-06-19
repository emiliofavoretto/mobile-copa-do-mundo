import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, SafeAreaView } from 'react-native';

const API_URL = 'https://raw.githubusercontent.com/emiliofavoretto/mobile-copa-do-mundo/refs/heads/main/db.json';

export default function App() {
    const [selecoes, setSelecoes] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((dados) => setSelecoes(dados));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>🏆 Grupos da Copa</Text>
            </View>

            <FlatList
                data={selecoes}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.lista}
                renderItem={({ item }) => (
                
                    <View style={styles.card}>
                        <Image source={{ uri: item.bandeira }} style={styles.bandeira} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.nomeSelecao}>{item.selecao}</Text>
                            <Text style={styles.grupo}>{item.grupo}</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f2f5' },
    header: { backgroundColor: '#151361', padding: 20, alignItems: 'center' },
    headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    lista: { padding: 15 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 12,
        flexDirection: 'row', // Alinha bandeira e textos lado a lado
        alignItems: 'center',
        // Pequena sombra para efeito de Card
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    bandeira: { width: 60, height: 40, borderRadius: 4 },
    infoContainer: { marginLeft: 15 },
    nomeSelecao: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    grupo: { fontSize: 14, color: '#666', marginTop: 2 },
});
