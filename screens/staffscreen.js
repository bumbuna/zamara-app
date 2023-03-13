import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Alert, Modal } from "react-native";
import { Text, View, SafeAreaView, TextInput, StyleSheet, Button } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";

const crudCrudEndpoint = 'https://crudcrud.com/api/27cebe33c2db4e60b7faeae5abf8eb11/zamara'

export function StaffScreen({ navigation, route }) {
    const [staffList, setStaffList] = useState([])
    fetch(crudCrudEndpoint)
        .then(res => res.json())
        .then(setStaffList)
        .catch((err) => console.log(err.message))

    return (
        <SafeAreaView>
            <View>
                <NewStaffForm staffList={staffList} />
                <StaffList staffList={staffList} />
            </View>
        </SafeAreaView>
    )
}

function StaffList({ staffList }) {
    return (
        <View>
            <FlatList
                keyExtractor={staff => staff._id}
                data={staffList}
                renderItem={staff => {
                    return (
                        <Text> {staff.staffName} </Text>
                    )
                }}
            />
        </View>
    )
}

function NewStaffForm({ staffList }) {
    const [staffName, setStaffName] = useState('')
    const [staffNumber, setStaffNumber] = useState('')
    const [staffSalary, setStaffSalary] = useState('0')
    const [staffDepartment, setStaffDepartment] = useState('')
    const [staffEmail, setStaffEmail] = useState('')

    function saveNewStaffRecord() {
        if (!staffDepartment || !staffEmail || !staffName || !staffNumber || !staffSalary) {
            Alert.alert('All fields are required');
            return
        }
        fetch(crudCrudEndpoint, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                staffDepartment,
                staffEmail,
                staffName,
                staffNumber,
                staffSalary
            })
        }).then(res => {
            return res.json()
        }).then(res => {
            staffList.push(res)
        })
    }

    return (
        <View>
            <Text style={styles.title}>Enter new Staff Details:</Text>
            <TextInput value={staffName} onChangeText={setStaffName} style={styles.input} placeholder={'Full Name'} />
            <TextInput value={staffEmail} onChangeText={setStaffEmail} style={styles.input} placeholder={'Email Address'} />
            <TextInput value={staffDepartment} onChangeText={setStaffDepartment} style={styles.input} placeholder={'Department'} />
            <TextInput value={staffSalary} onChangeText={setStaffSalary} style={styles.input} placeholder={'Salary'} />
            <TextInput value={staffNumber} onChangeText={setStaffNumber} style={styles.input} placeholder={'Number'} />
            <Button title="save record" onPress={saveNewStaffRecord} />
        </View>
    )
}

function EditStaffForm({ staffList, staff }) {
    const [staffName, setStaffName] = useState(staff.staffName)
    const [staffNumber, setStaffNumber] = useState(staff.staffNumber)
    const [staffSalary, setStaffSalary] = useState(staff.staffSalary)
    const [staffDepartment, setStaffDepartment] = useState(staff.staffDepartment)
    const [staffEmail, setStaffEmail] = useState(staff.staffEmail)

    function saveEditedStaffRecord() {
        if (!staffDepartment || !staffEmail || !staffName || !staffNumber || !staffSalary) {
            Alert.alert('All fields are required');
            return
        }
        fetch(crudCrudEndpoint, {
            method: 'update',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                staffDepartment,
                staffEmail,
                staffName,
                staffNumber,
                staffSalary
            })
        }).then(res => {
            return res.json()
        }).then(res => {
            staffList.push(res)
        })
    }

    return (
        <View>
            <Text style={styles.title}>Edit Staff Details:</Text>
            <TextInput value={staffName} onChangeText={setStaffName} style={styles.input} placeholder={'Full Name'} />
            <TextInput value={staffEmail} onChangeText={setStaffEmail} style={styles.input} placeholder={'Email Address'} />
            <TextInput value={staffDepartment} onChangeText={setStaffDepartment} style={styles.input} placeholder={'Department'} />
            <TextInput value={staffSalary} onChangeText={setStaffSalary} style={styles.input} placeholder={'Salary'} />
            <TextInput value={staffNumber} onChangeText={setStaffNumber} style={styles.input} placeholder={'Number'} />
            <Button title="save record" onPress={saveEditedStaffRecord} />
        </View>
    )
}

function deleteStaffRecord({ staffList, staff }) {
    fetch(crudCrudEndpoint, {
        method: 'delete'
    }).then(res => res.json())
        .then(JSON.stringify)
        .then(console.log)
}

function sendEmail({ staff, action = '' }) {
    const mail = `Profile ${action}: 
    Mail Subject: Profile Notification #${action}
    Mail Body: Greeting ${staff.staffName}, we are glad to inform you that your staff profile has been ${action}.
    `
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 5,
        marginVertical: 2,
        fontSize: 18
    },
    title: {
        fontWeight: '900',
        fontSize: 20
    }
})
