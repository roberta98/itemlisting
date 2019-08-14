//import axios from "axios";
 

const api = page => fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)

//const api = axios.create({
    //baseUrl: "https://jsonplaceholder.typicode.com/posts"
    //https://rocketseat-node.herokuapp.com/api       
//});  



export default api;