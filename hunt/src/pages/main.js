import React, { Component } from "react";
import {View, Text} from "react-native";
import api from "../services/api";

export default class Main extends Component {

    static navigationOptions = {
        title : "JSHunt"
    };

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
            console.log(body)  

        }).catch(e => {
            console.log("error" + e)      
        })
    }

    render() { 
        return(
            <View>
                <Text>Pagina Main</Text>
            </View>
        );
    }
}   