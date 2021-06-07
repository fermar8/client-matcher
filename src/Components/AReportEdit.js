import React from 'react';
import {Edit, SimpleForm, TextInput, DateTimeInput, SelectInput} from 'react-admin';

const ReportEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source='id' />
            <TextInput disabled source='user_account_id' />
            <TextInput disabled source='user_account_id_reported' />
            <TextInput disabled source='motiu' />
            <TextInput disabled source='comentari' />
            <TextInput disabled source='prova' />
            <DateTimeInput disabled source='data' />
            <TextInput source='resposta' />
            <SelectInput source='estat' choices={[
                { id: 'Enviado', name: 'Enviado' },
                { id: 'Abierto', name: 'Abierto' },
                { id: 'Cerrado', name: 'Cerrado' },
            ]} />
        </SimpleForm>
    </Edit>
);


export default ReportEdit;