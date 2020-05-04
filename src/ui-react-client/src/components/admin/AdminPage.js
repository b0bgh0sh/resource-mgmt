import React from 'react';
import { Form } from 'simple-react-form';
import ReactDOM from 'react-dom';
import UserTable from '../subComponents/UserTalbe';
import LocationTable from '../subComponents/LocationTable';
import SkillTable from '../subComponents/SkillTable';
import DisciplineTable from '../subComponents/DisciplineTable';
import Button from 'react-bootstrap/Button';
import '../../css/admin.css';

const AdminPage = () => {
  return (
    <div className="d-flex p-3 bg secondary">
      <div className="leftSide">
        <UserTable />
        <LocationTable />
      </div>
      <div className="center">
      </div>
      <div className="rightSide">
        <SkillTable />
        <DisciplineTable />
      </div>
    </div>
  );
};
export default AdminPage;
