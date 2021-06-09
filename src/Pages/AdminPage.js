import React from 'react';
import {Admin, Resource} from 'react-admin';
import AReportList from '../Components/AReportList'
import AReportEdit from '../Components/AReportEdit'
import AUserList from '../Components/AUserList'
import AUserEdit from '../Components/AUserEdit'

function AdminPage() {
    return (
        <Admin dataProvider={('http://localhost:8080')}>
        <Resource name='report' list={AReportList} edit={AReportEdit} />
        <Resource name='user' list={AUserList} edit={AUserEdit} />
        </Admin>
    );
}

export default AdminPage;