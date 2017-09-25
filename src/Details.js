import React from 'react';

/**
 * Class for the details pane on the right side of the page.
 * Displays all of the properties in a selected group.
 * (Scrolls to a specific selected property if one is selected.)
 */
class Details extends React.Component {
  componentDidUpdate(prevProps) {
    // If we've changed focus, scroll to the new focus
    if (this.props.focus && prevProps.focus !== this.props.focus) {
      const el = document.getElementById(this.props.focus);
      el && el.scrollIntoView();
    }
    // If we're displaying a new group, scroll to the top.
    if (this.props.group.name !== prevProps.group.name) {
      const el = document.getElementById('Details-Title');
      el && el.scrollIntoView();
    }
  }

  render() {
    return (
      <div>
      <div className="box" id="Details-Title">
        <h4 className="title is-4">{this.props.group.name}</h4>
      </div>
      {this.props.group.containing_object.properties.map((prop) => {
        return (
          <div className="box" key={prop.id} id={prop.id}>
            <h6 className="title is-6">{prop.name}</h6>
            Type: { prop.data_type } <br />
            Usage: { prop.app_keys.toString().replace(/,/g, ', ') } <br />
            EverTrue Field Name: { prop.name }
          </div>
        );
      })}
      </div>
    );
  }
}

export default Details;
