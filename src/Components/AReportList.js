import React from 'react';
import {List, Datagrid, TextField, Filter, SearchInput} from 'react-admin';

const ReportFilter = (props) => (<Filter {...props}>
    <SearchInput placeholder='Nº Reporte' source='id' resettable alwaysOn />
</Filter>)


function AReportList(props) {
    return (
        <List {...props} filters={<ReportFilter />}>
            <Datagrid rowClick='edit'>
                <TextField source='id' />
                <TextField source='user_account_id' />
                <TextField source='user_account_id_reported' />
                <TextField source='motiu' />
                <TextField source='comentari' />
                <TextField source='prova' />
            </Datagrid>
        </List>
    );
}

export default AReportList;