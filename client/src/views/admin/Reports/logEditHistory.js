import CommonTable from "components/common/CommanTable";

const LogEditHistory = () => {
    const driverEditData = [
        {
          driverName: "John Doe",
          milesDriven: 500,
          avgEditsPer1000Mi: 5,
          approvedEdits: 20,
          pendingEdits: 3,
          rejectedEdits: 1,
          cancelledEdits: 0
        },
        {
          driverName: "Jane Smith",
          milesDriven: 750,
          avgEditsPer1000Mi: 7,
          approvedEdits: 35,
          pendingEdits: 2,
          rejectedEdits: 0,
          cancelledEdits: 1
        },
        {
          driverName: "Emily Johnson",
          milesDriven: 600,
          avgEditsPer1000Mi: 6,
          approvedEdits: 30,
          pendingEdits: 4,
          rejectedEdits: 2,
          cancelledEdits: 1
        },
        {
          driverName: "Michael Brown",
          milesDriven: 800,
          avgEditsPer1000Mi: 8,
          approvedEdits: 40,
          pendingEdits: 5,
          rejectedEdits: 3,
          cancelledEdits: 2
        },
        {
          driverName: "Jessica Williams",
          milesDriven: 450,
          avgEditsPer1000Mi: 4,
          approvedEdits: 15,
          pendingEdits: 1,
          rejectedEdits: 1,
          cancelledEdits: 0
        },
        {
          driverName: "David Wilson",
          milesDriven: 900,
          avgEditsPer1000Mi: 9,
          approvedEdits: 50,
          pendingEdits: 0,
          rejectedEdits: 1,
          cancelledEdits: 3
        },
        {
          driverName: "Sarah Taylor",
          milesDriven: 550,
          avgEditsPer1000Mi: 5,
          approvedEdits: 25,
          pendingEdits: 2,
          rejectedEdits: 0,
          cancelledEdits: 1
        }
      ];
      
      const columns = [
        { title: "Driver Name", field: "driverName" },
        { title: "Miles Driven", field: "milesDriven" },
        { title: "Avg Edits/1000 mi", field: "avgEditsPer1000Mi" },
        { title: "Approved Edits", field: "approvedEdits" },
        { title: "Pending Edits", field: "pendingEdits" },
        { title: "Rejected Edits", field: "rejectedEdits" },
        { title: "Cancelled Edits", field: "cancelledEdits" }
      ];      
    return(
        <div>
        <CommonTable
        columns={columns}
        data={driverEditData}
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
export default LogEditHistory;