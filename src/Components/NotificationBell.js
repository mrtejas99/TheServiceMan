import React, { useState, useEffect } from "react";
import { Badge, Button, NavDropdown } from "react-bootstrap";

//import { FaBell } from "react-icons/fa";
import { BsFillChatFill } from "react-icons/bs";

import { Scrollbars } from 'react-custom-scrollbars-2';

function ChatBellIcon(props) {
	const count = props.unreadCount || 0;
	return (
        <span className="notification-icon">
            <BsFillChatFill />
			<Badge bg="danger" className="notification-badge" style={count === 0 ? {"opacity" : 0.0}:{}}>{count}</Badge>
        </span>
    );
}

function ChatMessageItem({item}) {
	return (
		<NavDropdown.Item className={item.is_read ? "" : "bg-light text-primary"} style={{width:'25vw', maxWidth:'30vw'}} href={"/chat/" + item.posted_by}>
			<div className="text-info">{item.posted_by}</div>
			<span>{item.message}</span>
		</NavDropdown.Item>
	);
}

function NotificationBell() {
    const [recentChats, setRecentChats] = useState([]);
	const [recentUnread, setRecentUnread] = useState(0);

    useEffect(() => setRecentUnread(
		recentChats.reduce((counter, elem) => elem.is_read ? counter : counter + 1, 0)
	), [recentChats]);

	useEffect(() => {
		setRecentChats([
			{
				message: "Test message",
				posted_by: "Narayan",
				is_read: false
			}
		]);
	}, []);

    return (
        <NavDropdown title={<ChatBellIcon unreadCount={recentUnread} />} onToggle={nextShow => {if (nextShow) setRecentUnread(0)}} className='hidden-arrow' align="end">
            <NavDropdown.Header className="d-flex flex-row justify-content-between">
            <Button variant="secondary" onClick={e=>setRecentChats([])}>Clear</Button>
			<Button href="/chathome" variant="secondary">View all Chat</Button>
			</NavDropdown.Header>
            <NavDropdown.Divider />
			<Scrollbars autoHeight>
            {
                recentChats.length > 0 ? recentChats.map(item => (
					<ChatMessageItem item={item} />
				)) : (
					<NavDropdown.ItemText align="center" style={{width:'25vw'}}>No recent chats</NavDropdown.ItemText>
				)
            }
			</Scrollbars>
        </NavDropdown>
    );
}

export { NotificationBell };
