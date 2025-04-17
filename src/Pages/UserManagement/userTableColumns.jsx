import dayjs from 'dayjs';

export const userTableColumns = (onEditClick) => [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  {
    key: 'role',
    label: 'Role',
    render: (val) => (
      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full capitalize">
        {val.replace("ROLE_", "")}
      </span>
    )
  },
  {
    key: 'lastLogin',
    label: 'Last Login',
    render: (val) =>
      val ? dayjs(val).format("DD MMM YYYY, hh:mm A") : '--',
  },
  {
    key: 'edit',
    label: 'Edit',
    render: (_, row) => (
      <button
        onClick={() => onEditClick(row)}
        className="text-blue-600 hover:text-blue-800 transition"
        title="Edit User"
      >
        ✏️
      </button>
    )
  }
];
