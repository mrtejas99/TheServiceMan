import React, { useState, useEffect } from "react";
import { Badge, Button, NavDropdown } from "react-bootstrap";

//import { FaBell } from "react-icons/fa";
import { BsFillChatFill } from "react-icons/bs";

function ChatBellIcon(props) {
	const count = props.unreadCount || 0;
	return (
        <span className="notification-icon">
            <BsFillChatFill />
			<Badge bg="danger" className="notification-badge" style={count === 0 ? {"opacity" : 0.0}:{}}>{count}</Badge>
        </span>
    );
}

function NotificationBell() {
    const [recentChats, setRecentChats] = useState([]);
	const [recentUnread, setRecentUnread] = useState(0);

    useEffect(() => setRecentUnread(
		recentChats.reduce((counter, elem) => elem.is_read ? counter + 1 : counter, 0)
	), [recentChats]);

    return (
        <NavDropdown title={<ChatBellIcon unreadCount={recentUnread} />} onToggle={nextShow => {if (nextShow) setRecentUnread(0)}} className='hidden-arrow' align="end">
            <NavDropdown.Header className="d-flex flex-row justify-content-between">
            <Button variant="secondary">Clear</Button>
			<Button href="/chathome" variant="secondary">View all Chat</Button>
			</NavDropdown.Header>
            <NavDropdown.Divider />
            {
                recentChats.length > 0 ? (
                    recentChats.map(item => <NavDropdown.Item style={{maxWidth:'30vw'}} href={"/chat/" + item.posted_by}>{item.message}</NavDropdown.Item>)
                ) : <NavDropdown.ItemText align="center" style={{width:'25vw'}}>No recent chats</NavDropdown.ItemText>
            }
        </NavDropdown>
    );
}

export { NotificationBell };
