import React from 'react';
import ReactDOM from 'react-dom';
import Button from './src/button'
import 'bootstrap/scss/bootstrap.scss';

class App extends React.Component{
    constructor() {
        super();
    }
    render() {
        //JSX here!
        return (
          <div className="container">
            <section className="jumbotron">
              <h3 className="jumbotron-heading">Search Github Users</h3>
            </section>
            <Button />
          </div>
        )
    }
};

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
