import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Contacts from 'expo-contacts';
import Contacto from '../Contacto';
import BackgroundImage from '../BackgroundImage'

const ContactosView = () => {
    const renderItem = ({ item }) => <Contacto name={item.name} />;
    const [contacto, setContacto] = useState({})
    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails],
                });

                if (data.length > 0) {
                    setContacto(data);
                    console.log(contact);
                } else {
                    console.log('on hay contactos');
                }
            }
        })();
    }, []);

    return (
        <View>
            <BackgroundImage/>
            <FlatList data={contacto} renderItem={renderItem} keyExtractor={item => item.id} />
        </View>
    )
}

export default ContactosView

const styles = StyleSheet.create({})