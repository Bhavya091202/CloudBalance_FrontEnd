const SidebarFilterSection = ({
    tab,
    openFilter,
    loading,
    searchTerm,
    setSearchTerm,
    filterData,
    selectedOptions,
    toggleOption,
    applySelectedOptions,
    setOpenFilter,
    setSelectedOptions,
    fetchFilter,
  }) => (
    <div key={tab.key} className="border-b py-2">
      {/* Heading */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => {
          setOpenFilter((prev) => (prev === tab.key ? null : tab.key));
          fetchFilter(tab.key);
        }}
      >
        <h3 className="text-sm font-semibold">{tab.label}</h3>
        <span className="text-xs text-gray-500">Include Only</span>
      </div>
  
      {/* Expand Content */}
      {openFilter === tab.key && (
        <>
          {loading ? (
            <div className="text-center py-4">
              <div className="h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder="Search"
                className="border p-2 rounded-md w-full text-sm mt-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
  
              <div className="mt-2 max-h-[300px] overflow-y-auto">
                {filterData.length > 0 ? (
                  filterData
                    .filter((item) =>
                      item.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 py-1">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded text-indigo-600"
                          checked={selectedOptions.includes(item)}
                          onChange={() => toggleOption(item)}
                        />
                        <label className="text-sm">{item}</label>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-400 text-sm">No options found.</p>
                )}
              </div>
  
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium"
                  onClick={() => applySelectedOptions(tab.key)}
                >
                  Apply
                </button>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium"
                  onClick={() => {
                    setOpenFilter(null);
                    setSelectedOptions([]);
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
  
  export default SidebarFilterSection;
  