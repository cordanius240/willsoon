import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
var userID = '';
const Chat = ({ id, name, online, lastMessage, time, imgUri, recipientId, navigation, route }) => {
    const MessageLen = 25;
    const { acctkn, rfrtkn } = route.params;
    function OpenChat(key) {
        console.log(userID);
        navigation.navigate('ChatPage', { id: key, userId: userID, recipientId: recipientId, acctkn: acctkn, rfrtkn: rfrtkn });
    }


    return (
        <TouchableOpacity style={styles.chat} key={id} onPress={() => OpenChat(id)}>
            <Image style={styles.profileImage} source={{ uri: imgUri }} />
            <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                    <Text style={styles.name}>{name}</Text>
                    {online && <View style={styles.onlineIndicator} />}
                    <Text style={styles.time}>{time}</Text>
                </View>
                <Text style={styles.lastMessage}>{lastMessage.length > MessageLen ? `${lastMessage.slice(0, MessageLen)}...` : lastMessage}</Text>
            </View>
        </TouchableOpacity>
    );
};

const ChatList = ({ numChats, navigation, route }) => {
    const [chats, setChats] = useState([]);
    useEffect(() => {

        const FetchChats = async () => {
            const { acctkn, rfrtkn } = route.params;
            const response = await fetch('http://192.168.1.134:8080/api/v1/chat/userChats', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + acctkn,
                },
            })
            const resp = await response.json()
            if (resp[0].lastMessage.senderId === resp[0].recipientId) {
                userID = resp[0].lastMessage.recipientId
            } else {
                userID = resp[0].lastMessage.senderId
            }
            setChats(resp.slice(0, numChats));
        }
        FetchChats();
    }, [numChats]);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {chats.map((chat) => (
                    <Chat
                        id={chat.chatId}
                        name={chat.recipientUsername}
                        online={chat.online}
                        lastMessage={chat.lastMessage.text}
                        time={chat.lastMessage.sendAtTime}
                        imgUri={'https://sun9-22.userapi.com/impf/c855028/v855028839/cf38b/TOQ5sQ175mw.jpg?size=1620x2160&quality=96&sign=237f0e326daf7805f5f37b3417730b5d&type=album'}
                        recipientId={chat.recipientId}
                        navigation={navigation}
                        route={route}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    chat: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        marginBottom: 5,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 2,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    chatContent: {
        flex: 1,
        marginLeft: 10,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    time: {
        color: '#A1A1A1',
        fontSize: 12,
    },
    lastMessage: {
        color: '#A1A1A1',
        fontSize: 14,
        marginTop: 5,
    },
    onlineIndicator: {
        backgroundColor: '#4CAF50',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
    },
});


export default ChatList;