import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import SelectInput from '../../Components/InputFieldWrapper/SelectFieldWrapper';
import useFormHandler from '../../hooks/handleChangeHook';
import TableWrapper from '../../Components/TableWrapper';
import {awsServiceColumns} from './AwsTableColumn';
import {awsServiceData} from './AwsTableColumn';

const AwsService = () => {
  const [formData, handleChange] = useFormHandler({ role: 'ROLE_ADMIN' });
  const [tab, setTab] = useState('EC2');

  const handleTabChange = (_, newValue) => setTab(newValue);

  const filteredData = awsServiceData.filter(item => item.service === tab);

  return (
    <div className="p-6">
      {/* Top right role dropdown */}
      <div className="flex justify-end mb-4">
        <SelectInput
          inputFieldData={{
            label: 'Select Role',
            name: 'role',
            type: 'select',
            placeholder: 'Select Role',
            labelClass: 'text-sm font-semibold mb-1 text-gray-700',
            inputClass:
              'border px-3 py-2 rounded-md shadow-sm w-60 focus:ring-2 focus:ring-blue-500',
            options: [],
          }}
          handleChange={handleChange}
          value={formData.role}
        />
      </div>

      {/* Tabs for services */}
      <Tabs value={tab} onChange={handleTabChange} className="mb-4">
        <Tab label="EC2" value="EC2" />
        <Tab label="RDS" value="RDS" />
        <Tab label="ASG" value="ASG" />
      </Tabs>

      {/* Table for selected tab */}
      <TableWrapper columns={awsServiceColumns} rows={filteredData} />
    </div>
  );
};

export default AwsService;
