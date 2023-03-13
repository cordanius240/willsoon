import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Friend = ({ name, online }) => {
    return (
        <View style={styles.friendContainer}>
            <Text style={styles.friendName}>{name}</Text>
            <Text style={[styles.friendStatus, online ? styles.online : styles.offline]}>
                {online ? 'Online' : 'Offline'}
            </Text>
        </View>
    );
};

const FriendList = ({ numFriends, acctkn }) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const FetchFriends = async () => {
            const response = await fetch('http://192.168.1.134:8080/api/v1/user/friends', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + acctkn,
                },
            })
            const resp = await response.json()

            // }).then(response => response.json()).then(response => { resp = response })

            setFriends(resp.slice(0, numFriends));
        };

        FetchFriends();
    }, [numFriends]);

    return (
        <View style={styles.container}>
            {friends.map((friend) => (
                <Friend key={friend.id} name={friend.username} enabled={friend.enabled} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    friendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    friendName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    friendStatus: {
        fontSize: 14,
        textTransform: 'uppercase',
    },
    online: {
        color: 'green',
    },
    offline: {
        color: 'red',
    },
});

export default FriendList;
