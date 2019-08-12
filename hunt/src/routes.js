import { createStackNavigator } from "react-navigation";
import Main from "./pages/main";
import "./config/statusBarConfig";

export default createStackNavigator({
    Main 

}, {
    navigationOptions : {
        headerStyle : {
            backgroundColor : "#DA552F"
        },
        headerTintColor : "#fff"
    }
}

)




