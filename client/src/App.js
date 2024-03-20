import {Login}  from "./pages/login/Login";
import {Register } from './pages/register/Register';
import {Home} from './pages/home/Home';
import {Navbar} from './componants/navbar/Navbar';
import {Leftbar} from './componants/leftbar/Leftbar';
import {Rightbar} from './componants/rightbar/Rightbar';
import {Profile} from './pages/profile/Profile';
import {
  createBrowserRouter,Navigate,Outlet,RouterProvider
} from 'react-router-dom';
import './style.scss'
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

function App() {
  //const currentuser=true;
  const {currentuser}=useContext(AuthContext);
  const {darkmode}=useContext(DarkModeContext);
  const queryClient = new QueryClient()
  const Layout=()=>{
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkmode?"dark":"light"}`}>
          <Navbar/>
          <div style={{display:"flex"}}>
            <Leftbar/>
            <div style={{flex:6}}>
              <Outlet/>
            </div>
            <Rightbar/>
          </div>
        </div>
      </QueryClientProvider>
    )
  }
  const ProtectedRoute=({children})=>{
    if(!currentuser)
    {
      return <Navigate to={'/login'}/>
    }
    return children
  }

  const router=createBrowserRouter([
    {
      path:'/',
      element:<ProtectedRoute>
        <Layout/>
      </ProtectedRoute>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/profile/:id',
          element:<Profile/>
        }
      ]
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/>
    }
  ])
  return (
    <div className="App">
      <RouterProvider  router={router}/>
    </div>
  );
}

export default App;
