import { createBrowserRouter } from "react-router-dom";
import App from "./App";



export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App/>

         
    }

])



// import App from "./App";
// import Header from "./Header";
// import Footer from "./Footer";
// // import "./tailwind.config"
// import './index.css';  // yoki './main.css'

// export const Router = createBrowserRouter([
//    {
//     path: "/",
//     element: <App/>,

//     children:[
//         {
//             path: "/header",
//             element: <Header/>

//         },

//         {
//             path: "/header",
//             element: <Header/>
//            }
    

//       ]

//    },


// ])