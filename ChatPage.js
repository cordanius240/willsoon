import React, { memo, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import uuid from 'react-native-uuid';
// sender_id: 0 - отправили мы, 1 - отправили нам
var recpID = '';
//var userId = '';

const ProfileHeader = ({ name, online, imgUri }) => {
    return (
        <View style={styles.profContainer}>
            <Image
                style={styles.avatar}
                source={{ uri: imgUri }}
            />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.status}>{online ? 'Online' : 'Offline'}</Text>
            </View>
        </View>
    );
};

const ChatPage = ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);
    //const [Messagescopy, setMessagescopy] = useState([{ chatId: "chatId", messageId: "messageId", recipientId: "recipientId", sendAtDate: "sendAtDate", sendAtTime: "sendAtTime", senderId: "senderId", status: "status", text: "text" },
    //{ chatId: "chatId1", messageId: "messageId1", recipientId: "recipientId1", sendAtDate: "sendAtDate1", sendAtTime: "sendAtTime1", senderId: "senderId1", status: "status1", text: "text1" }]);
    const Messagescopy = useRef([]);
    const [message, setMessage] = useState('no');
    const [nummessage, setNummessage] = useState(0);
    const flatListRef = useRef(null);
    const noMoreMessages = useRef(false);
    const { id, userId, recipientId, acctkn, rfrtkn } = route.params;
    recpID = recipientId;
    const offset = useRef(0);
    const FetchChats = async () => {
        const response = await fetch('http://192.168.1.134:8080/api/v1/chat/?id=' + id + '&offset=' + offset.current, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + acctkn,
            },
        })
        offset.current += 50
        const resp = await response.json()
        const len = resp.messagePojoList[0]
        console.log(len)
        const mess = resp.messagePojoList
        Messagescopy.current = [...messages, ...mess]
        //setMessages([...messages, ...mess])
        setMessages(Messagescopy.current)
        setNummessage(nummessage + len)
        console.warn(nummessage)
    }
    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS("http://192.168.1.134:8080/ws");
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, onConnected, onError);
    };
    const onConnected = () => {
        console.log("connected");
        stompClient.subscribe(
            "/user/" + userId + "/queue/messages",
            onMessageReceived
        );
    };

    const onError = (err) => {
        console.log(err);
    };
    const onMessageReceived = (msg) => {
        const notification = JSON.parse(msg.body);
        console.log("До " + Messagescopy.length)
        Messagescopy.current = [...messages, notification]
        setMessages(Messagescopy.current)
        //setMessagescopy(notification, ...Messagescopy);
        //setMessagescopy([notification, ...Messagescopy])
        //printMessage(notification.chatId, notification.messageId, notification.recipientId, notification.sendAtDate, notification.sendAtTime, notification.senderId, notification.status, notification.text)
        //setMessages([messager, ...messages]);
        //setMessages([notification, ...messages])
    };
    const printMessage = (chatId, messageId, recipientId, sendAtDate, sendAtTime, senderId, status, text) => {
        const messager = { chatId: chatId, messageId: messageId, recipientId: recipientId, sendAtDate: sendAtDate, sendAtTime: sendAtTime, senderId: senderId, status: status, text: text }
        setMessages([messager, ...messages]);
    }
    useEffect(() => {
        FetchChats();
        connect();
    }, []);

    // дозагрузка сообщений при скролле наверх
    const loadMoreMessages = () => {
        //offset += 50
        if (!noMoreMessages.current) {
            FetchChats();
            if (nummessage < offset) {
                noMoreMessages.current = true;
                console.log(noMoreMessages);
            }
        }
    };
    const sendMsg = () => {
        const messager = {
            chatId: id,
            messageId: uuid.v1(),
            senderId: userId,
            recipientId: recipientId,
            text: message,
            sendAtTime: new Date(),
            sendAtDate: new Date(),
            status: "DELIVERED",
        }
        stompClient.send("/app/chat", {}, JSON.stringify(messager));
        console.log("До " + messages.length)
        setMessages([messager, ...messages])
        console.log("Gjckt " + messages.length)
        setMessage('')
    };


    const scrollToBottom = () => {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    };

    return (
        <View style={styles.container}>
            <ProfileHeader name='Пачачи' online={true} imgUri='https://sun9-22.userapi.com/impf/c855028/v855028839/cf38b/TOQ5sQ175mw.jpg?size=1620x2160&quality=96&sign=237f0e326daf7805f5f37b3417730b5d&type=album' />
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={x => x.messageId.toString()}
                renderItem={({ item }) => <ChatItemMemo {...item} />}
                inverted
                contentContainerStyle={styles.listStyle}
                //onEndReached={loadMoreMessages}
                onEndReachedThreshold={0.1}
            />
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="camera" size={25} color="#9e9e9e" />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    value={message}
                    placeholder='Type your message'
                    onChangeText={setMessage}
                    multiline
                    maxLength={1000}
                    blurOnSubmit={false}
                    returnKeyType="send"
                    onSubmitEditing={sendMsg}
                />
                <TouchableOpacity style={styles.iconButton} onPress={message.length > 0 ? sendMsg : null}>
                    <Ionicons name="send" size={25} color={message.length > 0 ? "#0277bd" : "#9e9e9e"} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
const ChatItem = ({ text, time, senderId, route }) => {
    return (
        <View style={[styles.chatItemCommon, senderId === recpID ? styles.receive : styles.send]}>
            <Text style={styles.msgtxt}>{text}</Text>
            <Text style={styles.msgtime}>{time}</Text>
        </View>
    );
}
const ChatItemMemo = memo(ChatItem, (prevProps, nextProps) => true);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    header: {
        height: 60,
        backgroundColor: '#4267B2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    chatItemCommon: {
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        maxWidth: '75%',
    },
    send: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    receive: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
    },
    msgtxt: {
        padding: 10,
        fontSize: 18,
    },
    bottom: {
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 18,
        backgroundColor: '#f0f2f5',
        borderRadius: 20,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#4267B2',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    receiveButton: {
        backgroundColor: '#E4E6EB',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    receiveButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    profContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 14,
        color: '#999',
    },
    msgtime: {
        fontSize: 12,
        color: '#000000',
        marginTop: 5,
        alignSelf: 'flex-end',
    },
});

export default ChatPage;