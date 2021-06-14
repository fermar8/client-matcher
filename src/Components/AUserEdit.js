import React from 'react';
import {Edit, SimpleForm, TextInput, DateTimeInput } from 'react-admin';

const UserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput  disabled source='id' />
            <TextInput  source='nom' />
            <TextInput  source='cognom' />
            <TextInput  source='edat' />
            <TextInput  source='details' />
            <TextInput  source='nickname' />
            <TextInput  source='email' />
            <TextInput  source='password' />
            <DateTimeInput disabled source='created_at' />
            <DateTimeInput disabled source='updated_at' />
            <TextInput  source='servidor' />
            <TextInput  source='is_reported' />
            <TextInput  source='is_blocked' />
        </SimpleForm>
    </Edit>
);


export default UserEdit;