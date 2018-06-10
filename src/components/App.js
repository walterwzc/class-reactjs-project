import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Signin from './Signin'
import Form from './Form'

class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Signin} />
                <Route path="/form" component={Form} />
            </Switch>
        )
    }
}

export default App
