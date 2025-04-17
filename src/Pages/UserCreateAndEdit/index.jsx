import React, { useEffect, useState } from "react";
import Form from "../../Components/FormWrapper";
import { createUserConfig } from "./userFormConfig";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getApi, postApi, putApi } from "../../Services/commonService";
import { URLS } from "../../Services/url";
import { dashboard } from "../../routes/routeConfig";
import useFormHandler from "../../hooks/handleChangeHook";

const CreateUser = () => {
  const [formData, handleChange, setFormData] = useFormHandler({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    accountIds: [],
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [allAccounts, setAllAccounts] = useState([]);
  const [selectedAccountIds, setSelectedAccountIds] = useState([]);

  const dynamicFormConfig = [...createUserConfig];
  if (formData.role === "ROLE_CUSTOMER") {
    dynamicFormConfig.splice(-1, 0, {
      type: "custom",
      name: "accountDualList",
    });
  }

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await getApi(URLS.Account);
        setAllAccounts(res);
      } catch {
        toast.error("Failed to load accounts");
      }
    };

    if (formData.role === "ROLE_CUSTOMER") {
      fetchAccounts();
    } else {
      setAllAccounts([]);
    }
  }, [formData.role]);

  useEffect(() => {
    if (formData.role !== "ROLE_CUSTOMER") {
      setSelectedAccountIds([]);
    }
  }, [formData.role]);

  useEffect(() => {
    if (formData.role === "ROLE_CUSTOMER") {
      setFormData((prev) => ({
        ...prev,
        accountIds: selectedAccountIds,
      }));
    }
  }, [selectedAccountIds, formData.role, setFormData]);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const userData = await getApi(`/${URLS.User}/${id}`);
          setFormData({
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            email: userData?.email,
            role: userData?.role,
            accountIds: userData?.accountIds || [],
          });
          setSelectedAccountIds(userData?.accountIds || []);
        } catch {
          toast.error("Failed to fetch user details");
        }
      })();
    }
  }, [id, setFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      ...(formData.role !== "ROLE_CUSTOMER" && { accountIds: [] }),
    };

    try {
      if (id) {
        await putApi(`${URLS.User}/${id}`, payload);
        toast.success("User updated successfully");
      } else {
        await postApi("/user", payload);
        toast.success("User created successfully");
      }
      navigate(`/dashboard/${dashboard.users}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          {id ? "Edit User" : "Add New User"}
        </h2>
        <Form
          onSubmit={handleSubmit}
          handleChange={handleChange}
          formConfig={dynamicFormConfig}
          values={formData}
          dualListProps={{
            allAccounts,
            selectedAccountIds,
            setSelectedAccountIds,
          }}
        />
      </div>
    </div>
  );
};

export default CreateUser;
