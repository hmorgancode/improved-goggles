import React from 'react';

/**
 * Class for the details pane on the right side of the page.
 * Displays all of the properties in a selected group.
 * (Scrolls to a specific selected property if one is selected.)
 */
class Details extends React.Component {

  state = {
    // A hash of object IDs and refs to their dom elements in the details pane
    detailRefs: {}
  }
  // componentShouldUpdate? but refocusing would kind of be a side effect.

  render() {
    let newRefs = {}; // ???
    return (
      <div>
      <div className="box">
        <h4 className="title is-4">{this.props.group.name}</h4>
      </div>
      {this.props.group.containing_object.properties.map((prop, key) => {
        return (<div className="box" key={key}>
          <h6 className="title is-6">{prop.name}</h6>
          Type: { prop.data_type } <br />
          Usage: { prop.app_keys.toString().replace(/,/g, ', ') } <br />
          EverTrue Field Name: { prop.name }
        </div>);
      })}
      </div>
    );
  }
}

export default Details;
