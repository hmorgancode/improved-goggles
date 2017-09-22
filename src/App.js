import React from 'react';
import NavMenu from './NavMenu';
import Details from './Details';
import './App.css';

class App extends React.Component {
  state = {
    details: null
  }
  /**
   * Setter method for details; passed down to nav menu items.
   * @param  {object} details The desired object to show within the schema.
   */
  setDetails = (details) => {
    this.setState({ details });
  }

  render() {
    return (
      <div className="columns">
        <div className="box column is-one-third">
          <NavMenu schema={this.props.schema} />
        </div>
        <div className="box column is-two-thirds">
          <Details details={this.state.details} />
        </div>
      </div>
    );
  }
}

export default App;
