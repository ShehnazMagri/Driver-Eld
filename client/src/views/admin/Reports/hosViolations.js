import CommonTable from "components/common/CommanTable";

const HosViolations = () => {
    const complianceData = [
        {
          name: "John Doe",
          complianceScore: 95,
          milesDriven: 500,
          totalViolations: 2,
          formAndManner: 1,
          rest: 1,
          driving: 0,
          cycle: 0,
          duty: 0
        },
        {
          name: "Jane Smith",
          complianceScore: 88,
          milesDriven: 750,
          totalViolations: 5,
          formAndManner: 2,
          rest: 1,
          driving: 1,
          cycle: 1,
          duty: 0
        },
        {
          name: "Emily Johnson",
          complianceScore: 92,
          milesDriven: 600,
          totalViolations: 3,
          formAndManner: 1,
          rest: 1,
          driving: 0,
          cycle: 1,
          duty: 0
        },
        {
          name: "Michael Brown",
          complianceScore: 85,
          milesDriven: 800,
          totalViolations: 4,
          formAndManner: 2,
          rest: 1,
          driving: 0,
          cycle: 1,
          duty: 0
        },
        {
          name: "Jessica Williams",
          complianceScore: 90,
          milesDriven: 450,
          totalViolations: 2,
          formAndManner: 0,
          rest: 1,
          driving: 1,
          cycle: 0,
          duty: 0
        },
        {
          name: "David Wilson",
          complianceScore: 87,
          milesDriven: 900,
          totalViolations: 6,
          formAndManner: 3,
          rest: 1,
          driving: 2,
          cycle: 0,
          duty: 0
        },
        {
          name: "Sarah Taylor",
          complianceScore: 93,
          milesDriven: 550,
          totalViolations: 1,
          formAndManner: 0,
          rest: 0,
          driving: 1,
          cycle: 0,
          duty: 0
        }
      ];
      const columns = [
        { title: "Name", field: "name" },
        { title: "Compliance Score", field: "complianceScore" },
        { title: "Miles Driven", field: "milesDriven" },
        { title: "Total Violations", field: "totalViolations" },
        { title: "Form & Manner", field: "formAndManner" },
        { title: "Rest", field: "rest" },
        { title: "Driving", field: "driving" },
        { title: "Cycle", field: "cycle" },
        { title: "Duty", field: "duty" }
      ];
    return(
        <div>
        <CommonTable
        columns={columns}
        data={complianceData}
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
export default HosViolations;