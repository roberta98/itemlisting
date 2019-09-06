import React, { Component } from "react";
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from "react-native";
import api from "../services/api";

export default class Main extends Component {

    static navigationOptions = {
        title : "JSHunt"
    };

    state = {
        body: [],
    }

    page = 1; 

    componentDidMount(){
        this.loadItem();
    }

    //carrega os itens da aplicacao
    loadItem = (page = 1) => {
        //async
        //const response = await api.get('/item'); 
        // const docs = response.data;

        api(this.page).then(res => {
            if (res.status != 200) {  
                console.log('Error: ' + res.json());
                return;
            }
            return res.json();
        }).then(body => {  

            this.setState({ body : [...this.state.body, ...body]})  //concatenar veterores
            //console.log(body)   

        }).catch(e => {
            console.log("error" + e)      
        }) 

        
    }
    //Chama as proximas paginas da api
    loadMore = () => {
        
        if(this.page <= 10){
            this.page++;
            this.loadItem();
        }
        
    }

    renderItem = ({ item }) => (
        <View style={styles.container}>
            <View style={styles.elementsType}>
                <View style={(item.id % 2 !== 0) ? styles.odd : styles.pair} ></View>
            </View>
            
            <View style={styles.elements}> 
                <Text>{item.id}</Text> 
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
            </View>
        
            {/* <TouchableOpacity style={styles.button} onPress={() => {}}  >
                <Text style={styles.buttonText}> Acessar </Text>
            </TouchableOpacity> */}
        </View>
    )

    render() { 
        return(
            <View style={styles.container}>
                <FlatList  
                    contentContainerStyle={styles.list}
                    data={this.state.body}
                    keyExtractor={item => item.id}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.2}
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
        backgroundColor: "#62c2d2",
        position:'relative'
    }, 
    elements:{
        position:'absolute',
        padding: 30,
    },
    elementsType:{
        backgroundColor:"#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 20,          
        // transform: [{rotate: '-5deg'}],
    },
    odd: {
        backgroundColor:"#fff", 
        // borderWidth: 1,
        // borderColor: "#ddd",
        borderRadius: 20,   
        marginBottom: 15,
        height: 300,  
        display:'flex',
        overflow: 'hidden',


    },
    pair: {
    
        backgroundColor:"#fff", 
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 20,   
        marginBottom: 10,   
        // transform: [{rotate: '5deg'}], 
        height: 300,  
        // display: 'none'
        
    },
    list: {
        padding:20,
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