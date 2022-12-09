import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function Info({ route, navigation }) {

const [info, setInfo] = useState([]);

useEffect(() => {
    getPokemonDetails();
}, []);

const getPokemonDetails = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${route.params.pokemon}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        Alert.alert('Error', error);
      };
  };

  const colors = {
    grass:"#78C850",
    water:"#6890F0",
    fire:"#F08030",
    electric:"#F8D030",
    normal:"#A8A878",
    poison:"#A040A0",
    flying:"#A890F0",
    bug:"#A8B820",
    rock:"#B8A038",
    ground:"#E0C068",
    ghost:"#705898",
    fighting:"#C03028",
    ice:"#98D8D8",
    dragon:"#7038F8",
    psychic:"#F85888",
    dark:"#705848",
    steel:"#B8B8D0",
    fairy:"#EE99AC",
};


  const FindTypes = () => {
    if (info.types[1] == null) {
        return (
            <Text style={styles.text2}><Text style={{fontWeight: 'bold'}}>Type:</Text> {info.types[0].type.name}</Text>
        );
    } else {
        return (
            <Text style={styles.text2}><Text style={{fontWeight: 'bold'}}>Type:</Text> {info.types[0].type.name} & {info.types[1].type.name}</Text>
        );
    }
  }

  const FindAbilities = () => {
    if (info.abilities[1] == null  || info.abilities[1].is_hidden == true) {
        return (
            <Text style={styles.text2}>
                <Text style={{fontWeight: 'bold'}}>Ability:</Text> {info.abilities[0].ability.name}
        </Text>
        );
    } else {
        return (
            <Text style={styles.text2}>
                <Text style={{fontWeight: 'bold'}}>Ability:</Text> {info.abilities[0].ability.name} / {info.abilities[1].ability.name}
        </Text>
        );
    }
  }

  const HiddenAbility = () => {
    if (info.abilities[1] != null && info.abilities[1].is_hidden == true) {
        return (
            <Text style={styles.text2}>
                <Text style={{fontWeight: 'bold'}}>Hidden ability:</Text> {info.abilities[1].ability.name}
        </Text>
        );
    } else if (info.abilities[2] != null && info.abilities[2].is_hidden == true) {
        return (
            <Text style={styles.text2}>
                <Text style={{fontWeight: 'bold'}}>Hidden ability:</Text> {info.abilities[2].ability.name}
        </Text>
        );
    } else {
        return (
            <Text style={styles.text2}>
                <Text style={{fontWeight: 'bold'}}>Hidden ability:</Text> None
        </Text>
        );
    }
  }

  const BST = () => {
    const bst = info.stats[0].base_stat + info.stats[1].base_stat + info.stats[2].base_stat + 
    info.stats[3].base_stat + info.stats[4].base_stat + info.stats[5].base_stat;
    return bst;
  }


 return info.name ?(
    <View style={{
        borderWidth: 6,
        borderColor: colors[info.types[0].type.name],
        
        backgroundColor: '#4e4e52',
        flex: 1, 
        alignItems: 'center'
        }}>
    <View style={[styles.card,
        {borderColor: colors[info.types[0].type.name]}]
        }>
    <Image
      style={styles.image}
      source={{
        uri: `https://img.pokemondb.net/sprites/home/normal/${info.name}.png`,
      }}
    />
    <Image
      style={styles.image}
      source={{
        uri: `https://img.pokemondb.net/sprites/home/shiny/${info.name}.png`,
      }}
    />
    </View>
    <View style={[styles.info, {borderColor: colors[info.types[0].type.name]}]}>
    <Text style={styles.text2}><Text style={{fontWeight: 'bold'}}>Name:</Text>  {info.name}</Text>
    <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>Pokedex no. </Text>#{info.id}</Text>
    <FindTypes />
    <FindAbilities />
    <HiddenAbility />
    <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>Height:</Text> {info.height / 10} m</Text>
    <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>Weight:</Text> {info.weight/ 10} kg</Text>
    
    <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>Stats:</Text> </Text>
    </View>
    <View style={[styles.stats, {borderColor: colors[info.types[0].type.name]}]}>
        <Text style={styles.statText}>HP:                     {info.stats[0].base_stat}</Text>
        <Text style={styles.statText}>Attack:               {info.stats[1].base_stat}</Text>
        <Text style={styles.statText}>Defense:            {info.stats[2].base_stat}</Text>
        <Text style={styles.statText}>Sp. Attack:        {info.stats[3].base_stat}</Text>
        <Text style={styles.statText}>Sp. Defense:     {info.stats[4].base_stat}</Text>
        <Text style={styles.statText}>Speed:                {info.stats[5].base_stat}</Text>
        <Text style={styles.statText}>Total:                  <BST /></Text>
    </View>
  </View>
) : (
      <View style={styles.indicator}>
        <ActivityIndicator size="small" color="#E63F34" />
      </View>
    );
  };

const styles = StyleSheet.create({
    image: {
      width: 200,
      height: 200,
    },
    text: {
      fontSize: 18,
      marginBottom: 5,
      marginTop: 5,
      marginHorizontal: 10,
    },
    text2: {
        textTransform: 'capitalize',
        fontSize: 18,
        marginBottom: 5,
        marginTop: 5,
        marginHorizontal: 10,
    },
    card: {    
        display: 'flex',   
        flexDirection: 'row', 
        alignItems: 'center',    
        backgroundColor: "#d2d3d9",
        borderRadius: 20,  
        marginHorizontal: 10,    
        marginVertical: 10,  
        borderWidth: 6,
    }, 
    stats: {
        display: 'flex', 
        flex: 1,
        borderWidth: 6,
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: "#d2d3d9",
        borderRadius: 10, 
        marginVertical: 10,   
        marginHorizontal: 10, 
        width: '90%', 
    },
    statText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginHorizontal: 10, 
        marginTop: 1, 
        marginBottom: 1, 
    },
    indicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    info: {
      flex: 2,
      borderWidth: 6,
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: "#d2d3d9",
      borderRadius: 10,   
      marginVertical: 5,  
    },
    
  });
