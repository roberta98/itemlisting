import React, { Component } from "react";
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from "react-native";
import api from "../services/api";

export default class Main extends Component {

    static navigationOptions = {
        title : "JSHunt"
    };

    state = {
        docs: [],
    }

    componentDidMount(){

        this.loadItem();
    }

    loadItem = () => {
        //async
        //const response = await api.get('/item'); 
        // const docs = response.data;

        api.then(res => {
            if (res.status != 200) {
                console.log('Error: ' + res.json());
                return;
            }
            return res.json();
        }).then(body => {

            this.setState({ docs : body })  
            //console.log(body)   

        }).catch(e => {
            console.log("error" + e)      
        }) 

        
    }

    renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text> 
            
            <TouchableOpacity style={styles.button} onPress={() => {}}  >
                <Text style={styles.buttonText}> Acessar</Text>
            </TouchableOpacity>
        </View>
    )

    render() { 
        return(
            <View style={styles.container}>
                <FlatList  
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item.id}
                    renderItem={this.renderItem}
                />
                {/* <Text>Main Page: </Text>
                {this.state.docs.map(prod => (
                    <Text key={prod.id}> {prod.title} </Text>  
                ))} */}
            </View>
        );
    }
}   

const styles =  StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fafafa",
    }, 
    list: {
        padding:20,
    },
    itemContainer: {
        backgroundColor:"#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,

    },
    title:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#333"
    }, 
    body:{
        fontSize:16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },
    button:{
        height:42,
        borderRadius : 5,  
        borderWidth: 1,
        borderColor: "#DA552F",
        backgroundColor: "transparent", 
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10  
    },
    buttonText: {
        fontSize: 16, 
        color : "#DA552F",
        fontWeight: "bold"
    }


})