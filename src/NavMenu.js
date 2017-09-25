import React from 'react';

/**
 * Class for the navbar on the left side of the page.
 */
class NavMenu extends React.Component {

  state = {
    activeBlock: '',
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
    // For convenience, so we can unfold the object.
    const methods = {
      isActiveBlock: this.isActiveBlock,
      setActiveBlock: this.setActiveBlock,
      setDetailsGroup: this.props.setDetailsGroup,
      setDetailsFocus: this.props.setDetailsFocus
    };

    return (
      <aside className="menu">
        <p className="menu-label">
          Field Groups
        </p>
        <ul className="menu-list">
          <Block {...this.props.generalInfo} {...methods} />
          { this.props.groups.map((group) => <Block {...group} {...methods} key={group.id} />) }
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
    <li onClick={() => { props.setActiveBlock(props.name); props.setDetailsGroup(props.id) } } >
      <a className={props.isActiveBlock(props.name)}>{props.name}</a>
      <ul>
        {
          childBlocks.map((block) => (
            <li key={block.id} onClick={(e) => {e.stopPropagation(); props.setDetailsFocus(block.id);} }>
              <a>
                {block.name}
              </a>
            </li>
          ))
        }
      </ul>
    </li>
  );
}

export default NavMenu;
