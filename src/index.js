import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';

import {Link,Route,Router} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import Usuarios from './Pages/Usuarios'

import Canchas from './Pages/Canchas'
import Salir from './Pages/Salir'
import Reservas from './Pages/Reservas'

import UsuariosFormulario from '../src/Components/UsuariosFormulario'
import CanchasFormulario from '../src/Components/CanchasFormulario'
import ReservasFormulario from '../src/Pages/ReservasFormulario'

import Login from './Pages/Login'
import Header from '../src/Components/Header'
import Footer from '../src/Components/Footer'
// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

ReactDOM.render(
    <BrowserRouter>
    <Header></Header>
    <div className="container p-4">
    <Route  path='/' exact component={Login}/>
    <Route  path='/usuarios' component={Usuarios}/>

    <Route  path='/canchas' component={Canchas}/>
    <Route  path='/salir' component={Salir}/>
    <Route  path='/userform' component={UsuariosFormulario}/>
    <Route  path="/edit/:id" component={UsuariosFormulario} />
    <Route  path='/reservas' component={Reservas}/>
    <Route  path='/reservasform' component={ReservasFormulario}/>
    <Route  path='/canchasform' component={CanchasFormulario}/>
    <Route  path='/editcancha/:id' component={CanchasFormulario}/>
    </div>
    <Footer></Footer>
</BrowserRouter>,
document.getElementById('root'));