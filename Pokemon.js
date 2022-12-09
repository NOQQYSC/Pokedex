import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput} from 'react-native';

export default function Pokemon({ navigation }) {

    const [pokemon, setPokemon] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
     getPokemon();
    },[]);

    const getPokemon = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=905`;
    
        try {
          const response = await fetch(url);
          const data = await response.json();
          setPokemon(data.results);
        } catch (error) {
          Alert.alert('Error', error);
        };
      }
    
    return (
        <View style={styles.bg}>
        <View style={styles.searchCont}>
          <TextInput
            style={styles.search}
            placeholder="Pokedex"
            onChangeText={value => setSearch(value)}
            value={search}
          />
        </View>
        <ScrollView>
          <View style={styles.container}>
            {pokemon
              .filter(pokemon =>
                pokemon.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((pokemon, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    key={index}
                    style={styles.card}
                    onPress={() =>
                      navigation.navigate('Info', {
                        pokemon: pokemon.name,
                      })
                    }>
                    <Image
                      style={{width: 100, height: 100}}
                      source={{
                        uri: `https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`,
                      }}
                    />
                    <Text style={styles.text}>{pokemon.name}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </View>
    );
  }

  const styles = StyleSheet.create({  
    container: {    
     display: 'flex',    
     flexDirection: 'row',    
     flexWrap: 'wrap',    
     justifyContent: 'center',
     backgroundColor: '#4e4e52',
     borderBottomColor: '#4e4e52',     
     marginTop: 30,
     marginBottom: 100  
    },  
    card: {    
     display: 'flex',    
     alignItems: 'center',    
     backgroundColor: "#d2d3d9",
     borderRadius: 10,  
     marginHorizontal: 10,    
     marginVertical: 10,  
    },  
    searchCont: {    
     position: 'absolute',    
     marginBottom: 70,    
     left: '20%',    
     zIndex: 1,    
     marginTop: 10,  
    },  
    search: {    
    height: 40,    
    borderWidth: 1,    
    borderColor: 'black',
    backgroundColor: 'white',    
    textAlign: 'center',    
    width: 250,    
    borderRadius: 20,  
    },
    bg: {
    backgroundColor: '#4e4e52',
    display: 'flex',
    },
    text: {
    textTransform: 'capitalize',
      },
    });
