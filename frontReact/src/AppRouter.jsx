import {Routes, Route} from 'react-router-dom'
import PrivateRouter from "./components/PrivateRouter"
import HomePage from "./Pages/HomePage"
import NotFoundPage from "./Pages/NotFoundPage"


export const AppRouter = () => {
    return (
  
      <Routes>
  
        <Route element={<PrivateRouter/>} >               {/* Toas las rutas q esten debajo, seran privadas, con esto hacemos q para acceder a esas rutas tienen q estar logeados, sino te manda a otra pagina q defiinimos en PrivateRouter.jsx" */}
          <Route path='/' element={<HomePage/>} />
          {/* <Route path='/posts/createPost' element={<CreatePostForm/>}/>
          <Route path='/posts/:postId' element={<EditPostRoute/>}/> */}
  
        </Route>
  
        {/* <Route path='/posts' element={<PostListPage/>} />
        <Route path='/users/register' element={<RegisterForm/>} />
        <Route path='/users/login' element={<LoginForm/>} /> */}
  
        <Route path='*' element={<NotFoundPage/>} />
  
      </Routes>
  
    )
  }