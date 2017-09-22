import React from 'react';
import NavMenu from './NavMenu';
import Details from './Details';
import './App.css';

class App extends React.Component {
  state = {
    selectedGroup: this.props.generalInfo
  }
  /**
   * Setter method for details; passed down to nav menu items.
   * @param  {int} groupId The group's ID. -1 for the 'generalInfo' group.
   */
  setDetailsGroup = (groupId) => {
    if (groupId === -1) {
      this.setState({ selectedGroup: this.props.generalInfo });
    } else {
      // trawl through the rest of the schema and find and set our group
      let selectedGroup = this.props.groups.find((group) => {
        return group.id === groupId;
      });
      selectedGroup && this.setState({ selectedGroup });
    }
  }

  // Accept an ID for the focused element- that way we can focus on it by ref in Details.

  render() {
    return (
      <div id="app" className="box columns">
        <div className="box column is-one-third">
          <NavMenu generalInfo={this.props.generalInfo} groups={this.props.groups}
                   setDetailsGroup={this.setDetailsGroup} />
        </div>
        <div className="details box column is-two-thirds">
          <Details group={this.state.selectedGroup} />
        </div>
      </div>
    );
  }
}

export default App;
