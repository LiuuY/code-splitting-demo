import React from 'react'
import {BrowserRouter, Link, Route} from 'react-router-dom'
// getComponent is a function that returns a promise for a component
// It will not be called until the first mount
function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

const Module1 = asyncComponent(() =>
  System.import('./module1').then(module => module.default)
)
const Module2 = asyncComponent(() =>
  System.import('./module2').then(module => module.default)
)

const App = () =>
  <BrowserRouter>
    <div>
      <Link to="/module1">module1</Link>
      <br />
      <Link to="/module2">module2</Link>

      <h1>Welcome</h1>
      <Route path="/" render={() => <div>Home</div>} />
      <Route path="/module1" component={Module1} />
      <Route path="/module2" component={Module2} />
    </div>
  </BrowserRouter>

export default App
