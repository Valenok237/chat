import Sidebar from "./components/sidebar/sidebar";
import Body from "./components/body/body";
import Message from "./components/message/message";
import styles from './styles.module.css';
import { useEffect, useState } from "react";

const ChatPage = ({socket}) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        socket.on('response', (data) => setMessages([...messages, data]));
    },[socket, messages]);

    useEffect(() => {
        socket.on('responseTyping', (data) => {
            setStatus(data);
            setTimeout(() => setStatus(''), 1000);
        });
    }, [socket])

    return ( 
        <div className={styles.chat}>
            <Sidebar socket={socket} />
            <main className={styles.main}>
                <Body messages={messages} status={status}/>
                <Message socket={socket}/>
            </main> 
        </div>
    );
}
 
export default ChatPage;