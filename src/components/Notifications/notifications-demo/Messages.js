import React from 'react';
import {
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import a1 from '../../../images/people/a1.jpg';
import a2 from '../../../images/people/a2.jpg';
import a4 from '../../../images/people/a4.jpg';
import a6 from '../../../images/people/a6.jpg';
import avatar from '../../../images/avatar.png';

import s from './ListGroup.module.scss'; // eslint-disable-line

class MessagesDemo extends React.Component {
  render() {
    return (
      <ListGroup className={[s.listGroup, 'thin-scroll'].join(' ')}>
        <ListGroupItem className={[s.listGroupItem, 'bg-warning-light'].join(' ')}>
          <span className={[s.notificationIcon, 'thumb-sm'].join(' ')}>
            <img className="rounded-circle" src={a2} alt="..." />
            <i className="status status-bottom bg-success" />
          </span>
          <time className="text-link help float-right">10 sec ago</time>
          <h6 className="m-0 fw-bold mb-1">Chris Gray</h6>
          <p className="deemphasize text-ellipsis m-0">Hey! What&apos;s up? So many times since we</p>
        </ListGroupItem>
        <ListGroupItem className={s.listGroupItem}>
          <span className={[s.notificationIcon, 'thumb-sm'].join(' ')}>
            <img className="rounded-circle" src={avatar} alt="..." />
            <i className="status status-bottom bg-success" />
          </span>
          <time className="text-link help float-right">2 min ago</time>
          <h6 className="m-0 mb-1">Jamey Brownlow</h6>
          <p className="deemphasize text-ellipsis m-0">Good news coming tonight. Seems they agreed to proceed</p>
        </ListGroupItem>
        <ListGroupItem className={s.listGroupItem}>
          <span className={[s.notificationIcon, 'thumb-sm'].join(' ')}>
            <img className="rounded-circle" src={a1} alt="..." />
            <i className="status status-bottom bg-warning" />
          </span>
          <time className="text-link help float-right">9 min ago</time>
          <h6 className="m-0 mb-1">Livia Walsh</h6>
          <p className="deemphasize text-ellipsis m-0">Check out my latest email plz!</p>
        </ListGroupItem>
        <ListGroupItem className={s.listGroupItem}>
          <span className={[s.notificationIcon, 'thumb-sm'].join(' ')}>
            <img className="rounded-circle" src={avatar} alt="..." />
            <i className="status status-bottom bg-danger" />
          </span>
          <time className="text-link help float-right">12:56 AM</time>
          <h6 className="m-0 mb-1">Jaron Fitzroy</h6>
          <p className="deemphasize text-ellipsis m-0">What about summer break?</p>
        </ListGroupItem>
        <ListGroupItem className={s.listGroupItem}>
          <span className={[s.notificationIcon, 'thumb-sm'].join(' ')}>
            <img className="rounded-circle" src={a4} alt="..." />
            <i className="status status-bottom bg-gray-light" />
          </span>
          <time className="text-link help float-right">Yesterday</time>
          <h6 className="m-0 mb-1">Mike Lewis</h6>
          <p className="deemphasize text-ellipsis m-0">Just ain&apos;t sure about the weekend now. 90% I&apos;ll make it.</p>
        </ListGroupItem>
        <ListGroupItem className={s.listGroupItem}>
          <span className={[s.notificationIcon, 'thumb-sm'].join(' ')}>
            <img className="rounded-circle" src={a6} alt="..." />
            <i className="status status-bottom bg-success" />
          </span>
          <time className="text-link help float-right">Apr 23</time>
          <h6 className="m-0 mb-1">Freda Edison</h6>
          <p className="deemphasize text-ellipsis m-0">Hey what&apos;s up? Me and Monica going for a lunch somewhere. Wanna join?</p>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default MessagesDemo;
