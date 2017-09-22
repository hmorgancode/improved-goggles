import React from 'react';

class NavMenu extends React.Component {
  state = {
    activeBlock: ''
  }

  /**
   * Sets the currently active block to the one selected, or deselects
   * the currently active block.
   * @param  {string} blockName The name of the block. Right now these
   *                            are just self-documented in render().
   */
  setActiveBlock = (blockName) => {
    if (this.state.activeBlock === blockName) {
      this.setState({ activeBlock: '' });
    } else {
      this.setState({ activeBlock: blockName });
    }
  }

  /**
   * Used to denote the 'is-active' class during render.
   * @param  {string} blockName The name of the block
   * @return {string}           The active class or an empty string.
   */
  isActiveBlock = (blockName) => {
    return blockName === this.state.activeBlock ? 'is-active' : '';
  }

  render() {
    const generalInfo = [];
    const groups = [];
    this.props.schema.forEach((block) => {
      if (block.hasOwnProperty('containing_object')) {
        groups.push(block);
      } else {
        generalInfo.push(block);
      }
    });
    // For convenience, so we can unfold the object.
    const methods = {
      isActiveBlock: this.isActiveBlock,
      setActiveBlock: this.setActiveBlock
    };

    return (
      <aside className="menu">
        <p className="menu-label">
          Field Groups
        </p>
        <ul className="menu-list">
          { <Block name="General Info" containing_object={{properties: generalInfo}} {...methods} /> }
          { groups.map((group) => <Block {...group} {...methods} key={group.id} />) }
        </ul>
      </aside>
    );
  }
}

/**
 * A block for the nav menu. It will display any children if selected.
 */
function Block(props) {
  // Create the child blocks if they should be visible
  let childBlocks = [];
  if (props.isActiveBlock(props.name) !== '') {
    childBlocks = props.containing_object.properties;
  }

  return (
    <li onClick={() => props.setActiveBlock(props.name)} >
      <a className={props.isActiveBlock(props.name)}>{props.name}</a>
      <ul>
        {
          childBlocks.map((block) => (
            <li key={block.id}>
              <a>
                {block.name}
              </a>
            </li>
          ))
        }
      </ul>
    {
      // {block.data_type}
      // {block.app_keys}
    }
    </li>
  );
}

export default NavMenu;
