import React, { memo, useEffect, useState, useRef } from 'react';
import { Button, TouchableOpacity, FlatList, StyleSheet, Text, TextInput, View, Image } from 'react-native';
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
    const [message, setMessage] = useState('');
    const flatListRef = useRef(null);
    const noMoreMessages = useRef(false);
    const { id, recipientId, acctkn, rfrtkn } = route.params;
    useEffect(() => {
        const FetchChats = async () => {
            const response = await fetch('http://192.168.1.134:8080/api/v1/chat/?id=' + id + '&offset=0', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + acctkn,
                },
            })
            const resp = await response.json()
            const mess = resp.messagePojoList
            setMessages(mess, ...messages)
            console.log(messages)
            // console.log(messages)
            // for (i = 0; i < mess.length; i++) {
            //     if (mess[i].senderId == recipientId) {
            //         //console.log(mess[i].text)
            //         setMessages([{ id: mess[i].sendAtTime, type: 'receive', text: mess[i].text }, ...messages]);
            //         console.log(messages)
            //     } else {
            //         setMessages([{ id: mess[i].sendAtTime, type: 'send', text: mess[i].text }, ...messages]);
            //     }
            // }
        }
        FetchChats();

        //setTimeout(() => setMessages(msgs => ([{ id: new Date().getTime(), type: 'receive', text: 'hey! how are you?' }, ...msgs])), 1000);
    }, [])
    const loadMoreMessages = () => {
        console.log(noMoreMessages);
        if (!noMoreMessages.current) {
            console.log('ФФФФФФФФФФФФФФФФФФФФФФФФФФФФФФФФФ');
            const newMessages = [
                { id: 15, text: 'AAAAAAAAAAAAAAAAAAAAAA', time: '10:37', sender_id: 0 },
            ];
            setMessages([...messages, ...newMessages]);
            if (newMessages.length < 50) {
                noMoreMessages.current = true;
                console.log(noMoreMessages);
            }
        }
    };
    const scrollToBottom = () => {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    };
    const sendMsg = () => { setMessages([{ id: new Date().getTime(), type: 'send', text: message }, ...messages]) };
    const receiveMsg = () => { setMessages([{ id: new Date().getTime(), type: 'receive', text: message }, ...messages]); setMessage('') };
    return (
        <View style={styles.container}>
            <ProfileHeader name='Пачачи' online={true} imgUri='https://sun9-22.userapi.com/impf/c855028/v855028839/cf38b/TOQ5sQ175mw.jpg?size=1620x2160&quality=96&sign=237f0e326daf7805f5f37b3417730b5d&type=album' />
            {/* <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={x => x.id.toString()}
                renderItem={({ item }) => <ChatItemMemo {...item} />}
                inverted
                contentContainerStyle={styles.listStyle}
                onEndReached={loadMoreMessages}
                onEndReachedThreshold={0.1}
            /> */}
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.iconButton}>
                    <Text>Жопа
                    </Text>
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
                    <Text>Жопа
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const ChatItem = ({ text, time, sender_id, recipientId }) => {
    return (
        <View style={[styles.chatItemCommon, sender_id === recipientId ? styles.send : styles.receive]}>
            <Text style={styles.msgtxt}>{text}</Text>
            <Text style={styles.msgtime}>{time}</Text>
        </View>
    );
}

const ChatItemMemo = memo(ChatItem, (prevProps, nextProps) => true)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottom: {
        backgroundColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        padding: 0,
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    chatItemCommon: {
        marginBottom: 2
    },
    send: {
        alignSelf: 'flex-end',
    },
    receive: {
        alignSelf: 'flex-start',
    },
    msgtxt: {
        backgroundColor: 'lightgrey',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
        maxWidth: '75%'
    },
    listStyle: {
        paddingHorizontal: 10,
        paddingBottom: 20
    }
})

export default ChatPage;