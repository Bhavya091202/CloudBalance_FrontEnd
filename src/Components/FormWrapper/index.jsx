import React from 'react';
import InputField from '../InputFieldWrapper/NormalInputWrapper';
import SelectInput from '../InputFieldWrapper/SelectFieldWrapper';
import AccountDualList from '../DualListWrapper';
import CustomButtonWrapper from '../InputFieldWrapper/CustomButtonWrapper'; 

const Form = ({ onSubmit, handleChange, formConfig, values, dualListProps }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {formConfig.map((obj, index) => {
        if (obj.type === 'custom-group') {
          return <CustomButtonWrapper key={`group-${index}`} groupConfig={obj} />;
        }

        if (obj.type === 'select') {
          return (
            <SelectInput
              key={obj?.name}
              inputFieldData={obj}
              handleChange={handleChange}
              value={values[obj?.name]}
            />
          );
        }

        if (obj.type === 'custom' && obj.name === 'accountDualList' && values?.role === "ROLE_CUSTOMER") {
          return (
            <AccountDualList
              key="account-dual-list"
              {...dualListProps}
            />
          );
        }

        return (
          <InputField
            key={obj?.name}
            inputFieldData={obj}
            handleChange={handleChange}
            value={values[obj?.name]}
          />
        );
      })}
    </form>
  );
};

export default Form;
