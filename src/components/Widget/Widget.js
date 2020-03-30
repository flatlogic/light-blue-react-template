import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';
import s from './Widget.module.scss';
import classNames from 'classnames';
import Loader from '../Loader'; // eslint-disable-line css-modules/no-unused-class
import AnimateHeight from 'react-animate-height';
import uuidv4 from 'uuid/v4'
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class Widget extends React.Component {
  static propTypes = {
    title: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    close: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    fullscreen: PropTypes.bool,
    collapse: PropTypes.bool,
    refresh: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    settings: PropTypes.bool,
    settingsInverse: PropTypes.bool,
    tooltipPlacement: PropTypes.string,
    showTooltip: PropTypes.bool,
    bodyClass: PropTypes.string,
    customControls: PropTypes.bool,
    options: PropTypes.object, //eslint-disable-line,
    fetchingData: PropTypes.bool,
  };

  static defaultProps = {
    title: null,
    className: '',
    children: [],
    close: false,
    fullscreen: false,
    collapse: false,
    refresh: false,
    settings: false,
    settingsInverse: false,
    tooltipPlacement: 'bottom',
    showTooltip: false,
    bodyClass: '',
    customControls: false,
    customClose: null,
    customExpand: null,
    customCollapse: null,
    customFullscreen: null,
    customReload: null,
    customDropDown: null,
    prompt: false,
    collapsed: false,
    options: {},
    fetchingData: false,
    widgetType: "",
  };

  constructor(props) {
    super(props);

    this.state = {
      randomId: uuidv4(),
      hideWidget: false,
      collapseWidget: !!props.collapsed,
      height:  props.collapsed ? 0 : 'auto',
      fullscreened: false,
      reloading: false,
      modal: false,
      apiData: ''
    }

  }



  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  }

  handleClose = () => {
    this.setState({ hideWidget: !this.state.hideWidget})
  }

  handleCollapse = () => {
    let heightValue = this.state.collapseWidget ? 'auto' : 0
    this.setState({
      height: heightValue,
      collapseWidget: !this.state.collapseWidget,
      reloading: false
    });

  };

  closeWithModal = () => {
    this.toggleModal();
    this.handleClose();
  }

  handleExpand = () => {
    
    this.setState({
      height: 'auto',
      collapseWidget: false
    });

  };

  handleReload = () => {
    const { widgetType, updateWidgetData } = this.props;
    const type = widgetType;
    if(type) {
      updateWidgetData(type)
    }
    this.setState({ reloading: true });
    let endpoint = false;
    if(!endpoint) {
      setTimeout(() => this.setState({ reloading: false }),2000);
    } else {
      this.setState({ reloading: true });
      fetch('https://yourapi.com')
        .then(response => response.json())
        .then(json => this.setState({ apiData: json.title}))
        .then(setTimeout(() => this.setState({ reloading: false }), 1000))
    }
  }

  handleFullscreen = () => {
    this.setState({ fullscreened: !this.state.fullscreened });
  }
  
  render() {
  
    const {
      title,
      className,
      children,
      close,
      fullscreen,
      collapse,
      refresh,
      settings,
      settingsInverse,
      tooltipPlacement,
      showTooltip,
      bodyClass,
      customControls,
      customClose,
      customExpand,
      customCollapse,
      customFullscreen,
      customReload,
      fetchingData,
      customDropDown,
      customBody,
      prompt,
      collapsed,
      widgetType,
      updateWidgetData,
      options, //eslint-disable-line
      ...attributes
    } = this.props;
    const mainControls = !!(close || fullscreen || collapse || refresh || settings || settingsInverse);

    const {
      reloading,
      fullscreened,
      randomId,
      height,
      hideWidget,
      collapseWidget,
      modal,
    } = this.state;

    
    
    return (
    <React.Fragment>
      <section
        style={{display: hideWidget ? 'none' : ''}}  
        className={
          classNames('widget', {'fullscreened' : !!fullscreened, 'collapsed' : !!collapseWidget}, s.widget, className, (reloading || fetchingData) ? s.reloading : '')
        } {...attributes}
        >
        {
          title && (
            typeof title === 'string'
              ? <h5 className={s.title}>{title}</h5>
              : <header className={s.title}>{title}</header>
          )
        }
        
        {
          !customControls && mainControls && (
            <div className={`${s.widgetControls} widget-controls`}>
              {settings && (
                <button><i className="la la-cog" /></button>
              )}
              {settingsInverse && (
                <button className={`bg-gray-transparent ${s.inverse}`}><i
                  className="la la-cog text-white"
                /></button>
              )}
              {refresh && (
                <button onClick={this.handleReload} id={`reloadId-${randomId}`}>
                  {typeof refresh === 'string' ?
                    <strong className="text-gray-light">{refresh}</strong> :
                    <i className="la la-refresh" />}
                  {showTooltip && (
                    <UncontrolledTooltip
                      placement={tooltipPlacement}
                      target={`reloadId-${randomId}`}
                    >Reload</UncontrolledTooltip>
                  )}
                </button>
              )}
              {fullscreen && (
                <button onClick={this.handleFullscreen} id={`fullscreenId-${randomId}`}>
                  <i className={`glyphicon glyphicon-resize-${fullscreened ? 'small' : 'full'}`} />
                  {showTooltip && (
                    <UncontrolledTooltip
                      placement={tooltipPlacement}
                      target={`fullscreenId-${randomId}`}
                    >Fullscreen</UncontrolledTooltip>
                  )}
                </button>
              )}
              {!fullscreened && 
                collapse && (
                  <span>
                    <button onClick={this.handleCollapse} id={`collapseId-${randomId}`}>
                    <i className={`la la-angle-${!collapseWidget ? 'down' : 'up'}`} />
                      {showTooltip && (
                        <UncontrolledTooltip
                          placement={tooltipPlacement}
                          target={`collapseId-${randomId}`}
                        >Collapse</UncontrolledTooltip>
                      )}
                    </button>
                  </span>
                )
              }
              {!fullscreened && (
                (close && !prompt) ? (
                <button onClick={this.handleClose} id={`closeId-${randomId}`}>
                  {typeof close === 'string' ?
                    <strong className="text-gray-light">{close}</strong> :
                    <i className="la la-remove" />}
                  {showTooltip && (
                    <UncontrolledTooltip
                      placement={tooltipPlacement}
                      target={`closeId-${randomId}`}
                    >Close</UncontrolledTooltip>
                  )}
                </button>
              ) : (
                <button onClick={this.toggleModal} id={`closeId-${randomId}`}>
                {typeof close === 'string' ?
                  <strong className="text-gray-light">{close}</strong> :
                  <i className="la la-remove" />}
                {showTooltip && (
                  <UncontrolledTooltip
                    placement={tooltipPlacement}
                    target={`closeId-${randomId}`}
                  >Modal</UncontrolledTooltip>
                )}
              </button>
              ))}
            </div>
          )}
          {customDropDown && (
            <div className={`${s.widgetControls} widget-controls`}>
            <UncontrolledDropdown>
              <DropdownToggle
                tag="span"
                data-toggle="dropdown"

              >
                <i className="glyphicon glyphicon-cog" />
              </DropdownToggle>
              <DropdownMenu className="bg-widget-transparent" right>
                <DropdownItem onClick={this.handleReload} title="Reload">
                  Reload &nbsp;&nbsp;
                  <span className="badge badge-pill badge-success animated bounceIn">
                    <strong>9</strong>
                  </span>
                </DropdownItem>
                
                <DropdownItem onClick={this.handleFullscreen} title={!fullscreened ? "Full Screen" : "Restore"}>{!fullscreened ? "Fullscreen" : "Restore"} </DropdownItem>
                <DropdownItem divider />
                {!fullscreened && (!prompt ? <DropdownItem onClick={this.handleClose} title="Close">Close</DropdownItem>
                : <DropdownItem onClick={this.toggleModal} title="Close">Close</DropdownItem>)}
              </DropdownMenu>
            </UncontrolledDropdown>
            </div>
          )}
        {
          customControls && (
            <div className={`${s.widgetControls} widget-controls`}>
              {!fullscreened && ((customClose && !prompt) ? (
                <button onClick={this.handleClose} id={`closeId-${randomId}`} className={s.customControlItem}><i title="Close" className="glyphicon glyphicon-remove"/></button>
              ) : (
                  <button onClick={this.toggleModal} id={`closeId-${randomId}`} className={s.customControlItem}><i title="Close" className="glyphicon glyphicon-remove"/></button>
              ))}
              {!fullscreened && (customCollapse && (
                  <button onClick={this.handleCollapse} id={`closeId-${randomId}`} className={s.customControlItem}><i title="Collapse" className={`glyphicon glyphicon-chevron-${!collapseWidget ? 'down' : 'up'}`}/></button>
              ))}
              {customFullscreen && (
                  <button onClick={this.handleFullscreen} id={`closeId-${randomId}`} className={s.customControlItem}><i title="Fullscreen" className={`glyphicon glyphicon-resize-${fullscreened ? 'small' : 'full'}`} /></button>
              )}
              {customReload && (
                  <button onClick={this.handleReload} id={`closeId-${randomId}`} className={s.customControlItem}><i title="I am spinning!" className="fa fa-refresh" /></button>
              )}
            </div>
          )
        }
        <AnimateHeight
          duration={ 500 }
          height={ height }
        >

          <div className={`${s.widgetBody} widget-body ${bodyClass}`}>
            {reloading || fetchingData ?  <Loader className={s.widgetLoader} size={40}/> : customBody ? (
                <div className="jumbotron handle bg-default text-white mb-0">
                <div className="container">
                  <h1>Draggable story!</h1>
                  <p className="lead">
                    <em>Build</em> your own
                    interfaces! Sit back and relax.
                  </p>
                  <p className="text-center">
                    <button onClick={this.handleFullscreen} className="btn btn-danger btn-lg">
                      {!fullscreened ? 
                        <React.Fragment>Fullscreen me! &nbsp;
                          <i className="fa fa-check" />
                        </React.Fragment>
                        : 'Go Back'
                      }
                    </button>
                  </p>
                </div>
              </div>
            ) : children}
          </div>
    
       </AnimateHeight>
       
      </section>
      {prompt && (
        <Modal isOpen={modal} toggle={this.toggleModal} id="news-close-modal">
        <ModalHeader toggle={this.toggleModal} id="news-close-modal-label">Sure?</ModalHeader>
        <ModalBody className="bg-white">
          Do you really want to unrevertably remove this super news widget?
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={this.toggleModal} data-dismiss="modal">No</Button>{' '}
          <Button color="danger" onClick={this.closeWithModal} id="news-widget-remove">Yes,
            remove widget</Button>
        </ModalFooter>
      </Modal> 
      )}
      <div style={{display: fullscreened ? 'block'  : 'none'}} className={s.widgetBackground}></div>
      </React.Fragment>
    );
  }
}

export default Widget;
