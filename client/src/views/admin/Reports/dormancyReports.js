import CommonTable from "components/common/CommanTable";

const DormancyReports = () => {
    const vehicleData = [
        {
          vehicleNumber: "ABC123",
          vehicleType: "Truck",
          daysDormant: 2,
          lastLocation: "New York, NY",
          lastActive: "2024-10-05"
        },
        {
          vehicleNumber: "XYZ456",
          vehicleType: "Van",
          daysDormant: 5,
          lastLocation: "Los Angeles, CA",
          lastActive: "2024-10-01"
        },
        {
          vehicleNumber: "LMN789",
          vehicleType: "SUV",
          daysDormant: 0,
          lastLocation: "Chicago, IL",
          lastActive: "2024-10-07"
        },
        {
          vehicleNumber: "QWE321",
          vehicleType: "Sedan",
          daysDormant: 3,
          lastLocation: "Houston, TX",
          lastActive: "2024-10-04"
        },
        {
          vehicleNumber: "RTY654",
          vehicleType: "Truck",
          daysDormant: 1,
          lastLocation: "Miami, FL",
          lastActive: "2024-10-06"
        },
        {
          vehicleNumber: "UIO987",
          vehicleType: "Bus",
          daysDormant: 4,
          lastLocation: "Seattle, WA",
          lastActive: "2024-10-02"
        },
        {
          vehicleNumber: "JKL258",
          vehicleType: "Pickup",
          daysDormant: 0,
          lastLocation: "Denver, CO",
          lastActive: "2024-10-07"
        }
      ];
      const columns = [
        { title: "Vehicle Number", field: "vehicleNumber" },
        { title: "Vehicle Type", field: "vehicleType" },
        { title: "Days Dormant", field: "daysDormant" },
        { title: "Last Location", field: "lastLocation" },
        { title: "Last Active", field: "lastActive" }
      ];
    return(
        <div>
        <CommonTable
        columns={columns}
        data={vehicleData}
        // pagination={pagination}
        // onDelete={(id) => handleDelete(id)}
        // // onAssignTask={handleAssignTaskOpen}
        // handlePageChange={handlePageChange}
        // userId={loginuserlist?.id}
        // pageSize={pageSize}
      />
      </div>
    )
}
export default DormancyReports;