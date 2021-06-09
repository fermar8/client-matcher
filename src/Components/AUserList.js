import React from 'react';
import {List, Datagrid, TextField, Filter, SearchInput} from 'react-admin';

const UserFilter = (props) => (<Filter>
    <SearchInput placeholder='Nombre' source='nom' resettable alwaysOn />
</Filter>)


function AUserList() {
    return (
        <List filters={<UserFilter />}>
            <Datagrid rowClick='edit'>
                <TextField source='id' />
                <TextField source='nom' />
                <TextField source='cognom' />
                <TextField source='edat' />
                <TextField source='details' />
                <TextField source='nickname' />
                <TextField source='email' />
                <TextField source='password' />
                <TextField source='created_at' />
                <TextField source='updated_at' />
                <TextField source='servidor' />
                <TextField source='is_reported' label='Active' />
                <TextField source='is_blocked' label='Active' />
            </Datagrid>
        </List>
    );
}

export default AUserList;