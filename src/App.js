import React from 'react';
import NavMenu from './NavMenu';
import Details from './Details';
import './App.css';

class App extends React.Component {
  state = {
    // The group for the details pane to display
    selectedGroup: this.props.generalInfo,
    // The ID of the element for the details pane to focus on
    focusedElement: null
  }
  /**
   * Setter method for the details pane; passed down to nav menu items.
   * @param  {int} groupId The group's ID. -1 for the 'generalInfo' group.
   */
  setDetailsGroup = (groupId) => {
    if (groupId === -1) {
      this.setState({ selectedGroup: this.props.generalInfo, focusedElement: null });
    } else {
      // trawl through the rest of the schema and find and set our group
      let selectedGroup = this.props.groups.find((group) => {
        return group.id === groupId;
      });
      selectedGroup && this.setState({ selectedGroup, focusedElement: null });
    }
  }

  /**
   * Setter method for the scroll of the details pane; passed down to nav menu items
   * @param  {int} elementId The ID for the specific element we want to scroll to
   */
  setDetailsFocus = (elementId) => {
    this.setState({ focusedElement: elementId });
  }

  render() {
    return (
      <div id="app" className="box columns">
        <div className="box column is-one-third">
          <NavMenu generalInfo={this.props.generalInfo} groups={this.props.groups}
                   setDetailsGroup={this.setDetailsGroup}
                   setDetailsFocus={this.setDetailsFocus} />
        </div>
        <div className="details box column is-two-thirds">
          <Details group={this.state.selectedGroup} focus={this.state.focusedElement} />
        </div>
      </div>
    );
  }
}

export default App;
