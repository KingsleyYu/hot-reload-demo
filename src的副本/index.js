import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/header'


const rootEl=document.getElementById('app')


class App extends React.Component{
   render(){
       return (
            <div>
                <Header></Header>
            </div>
       )
   }
}

ReactDOM.render(
    <App></App>,
    rootEl
)

