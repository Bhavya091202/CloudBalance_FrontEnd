import React from "react";

const AccountDualList = ({  allAccounts = [],  selectedAccountIds = [],  setSelectedAccountIds = () => {} }) => {
  return (
    <div className="mt-8 border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Manage Account ID(s)</h3>

      <div className="grid grid-cols-2 gap-6">
        {/* Available Accounts */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Choose Account IDs to Associate</h4>
            <span className="text-sm text-blue-600">{allAccounts.length} Available</span>
          </div>

          <div className="border rounded h-64 overflow-y-auto p-2">
            {allAccounts
              .filter((acc) => !selectedAccountIds.includes(acc.id))
              .map((acc) => (
                <div key={acc.id} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    checked={selectedAccountIds.includes(acc.id)}
                    onChange={() =>
                      setSelectedAccountIds((prev) => [...prev, acc.id])
                    }
                  />
                  <span className="ml-2">
                    {acc.name} ({acc.accountId})
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Selected Accounts */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Associated Account IDs</h4>
            <span className="text-sm text-blue-600">{selectedAccountIds.length} Added</span>
          </div>

          <div className="border rounded h-64 overflow-y-auto p-2">
            {selectedAccountIds.length === 0 ? (
              <div className="text-gray-500 text-sm text-center py-16">
                <div className="text-4xl mb-2">📂</div>
                <div>No Account IDs Added</div>
              </div>
            ) : (
              selectedAccountIds.map((id) => {
                const acc = allAccounts.find((a) => a.id === id);
                return (
                  <div key={id} className="flex items-center justify-between mb-1">
                    <span>{acc?.name} ({acc?.accountId})</span>
                    <button
                      onClick={() =>
                        setSelectedAccountIds((prev) =>
                          prev.filter((aid) => aid !== id)
                        )
                      }
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDualList;
