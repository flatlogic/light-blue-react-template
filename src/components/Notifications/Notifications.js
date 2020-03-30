import React from 'react';
import {
  ButtonGroup,
  Button,
} from 'reactstrap';
import classnames from 'classnames';
import NotificationsDemo from './notifications-demo/Notifications';
import NewNotificationsDemo from './notifications-demo/NewNotifications';
import MessagesDemo from './notifications-demo/Messages';
import ProgressDemo from './notifications-demo/Progress';

import s from './Notifications.module.scss';

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationsTabSelected: 1,
      newNotifications: null,
      isLoad: false,
    };
  }

  changeNotificationsTab(tab) {
    this.setState({
      notificationsTabSelected: tab,
      newNotifications: null,
    });
  }

  loadNotifications() {
    this.setState({
      isLoad: true,
    });

    setTimeout(() => {
      this.setState({
        newNotifications: (<NewNotificationsDemo />),
        isLoad: false,
      });
    }, 1500);
  }

  render() {
    let notificationsTab;

    switch (this.state.notificationsTabSelected) {
      case 1:
        notificationsTab = (<NotificationsDemo />);
        break;
      case 2:
        notificationsTab = (<MessagesDemo />);
        break;
      case 3:
        notificationsTab = (<ProgressDemo />);
        break;
      default:
        notificationsTab = (<NotificationsDemo />);
        break;
    }
    return (
      <section className={`${s.notifications} navbar-notifications`}>
        <header className={[s.cardHeader, 'card-header'].join(' ')}>
          <div className="text-center mb-sm">
            <strong>You have 13 notifications</strong>
          </div>
          <ButtonGroup className={s.notificationButtons}>
            <Button outline color="default" size="sm" className={s.notificationButton} onClick={() => this.changeNotificationsTab(1)} active={this.state.notificationsTabSelected === 1}>Notifications</Button>
            <Button outline color="default" size="sm" className={s.notificationButton} onClick={() => this.changeNotificationsTab(2)} active={this.state.notificationsTabSelected === 2}>Messages</Button>
            <Button outline color="default" size="sm" className={s.notificationButton} onClick={() => this.changeNotificationsTab(3)} active={this.state.notificationsTabSelected === 3}>Progress</Button>
          </ButtonGroup>
        </header>
        {this.state.newNotifications || notificationsTab}
        <footer className={[s.cardFooter, 'text-sm', 'card-footer'].join(' ')}>
          <Button
            color="link"
            className={classnames({ disabled: this.state.isLoad }, s.btnNotificationsReload, 'btn-xs', 'float-right', 'py-0')}
            onClick={() => this.loadNotifications()}
            id="load-notifications-btn"
          >
            {this.state.isLoad ? <span><i className="la la-refresh la-spin" /> Loading...</span> : <i className="la la-refresh" />}
          </Button>
          <span className="fs-mini">Synced at: 21 Apr 2014 18:36</span>
        </footer>
      </section>
    );
  }
}

export default Notifications;
