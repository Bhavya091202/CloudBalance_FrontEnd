import SidebarWrapper from "../../FilterSideBarWrapper";
import SidebarFilterSection from "../SidebarFilterSection";

const CustomizeFilterSidebar = ({
  open,
  onClose,
  tabMap,
  openFilter,
  setOpenFilter,
  loading,
  searchTerm,
  setSearchTerm,
  filterData,
  selectedOptions,
  toggleOption,
  applySelectedOptions,
  setSelectedOptions,
  fetchFilter,
  onClearAllFilters, // ✅ Add this prop
}) => (
  <SidebarWrapper open={open} onClose={onClose}>
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={onClearAllFilters}
        className="text-sm text-red-600 hover:underline"
      >
        ❌ Clear All
      </button>
    </div>

    <div className="space-y-4">
      {Object.values(tabMap).map((tab) => (
        <SidebarFilterSection
          key={tab.key}
          tab={tab}
          openFilter={openFilter}
          loading={loading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterData={filterData}
          selectedOptions={selectedOptions}
          toggleOption={toggleOption}
          applySelectedOptions={applySelectedOptions}
          setOpenFilter={setOpenFilter}
          setSelectedOptions={setSelectedOptions}
          fetchFilter={fetchFilter}
        />
      ))}
    </div>
  </SidebarWrapper>
);

export default CustomizeFilterSidebar;
