import CommonTable from "components/common/CommanTable";

const DutyStatusReports = () => {
    const columns = [
        { title: "Date", field: "date" },
        { title: "Hours Driven", field: "hoursDriven" },
        { title: "Miles Driven", field: "milesDriven" },
        { title: "Dwell Time", field: "dwellTime" },
        { title: "On Duty", field: "onDuty" },
        { title: "Personal", field: "personal" },
        { title: "Yard Move", field: "yardMove" },
        { title: "Off Duty", field: "offDuty" },
        { title: "Sleeper Berth", field: "sleeperBerth" },
      ];
      
      const driverData = [
        {
          date: "2024-10-01",
          hoursDriven: 8,
          milesDriven: 500,
          dwellTime: 30, // in minutes
          onDuty: 10, // in hours
          personal: 2, // in hours
          yardMove: 1, // in hours
          offDuty: 6, // in hours
          sleeperBerth: 8 // in hours
        },
        {
          date: "2024-10-02",
          hoursDriven: 7,
          milesDriven: 450,
          dwellTime: 25,
          onDuty: 9,
          personal: 3,
          yardMove: 0.5,
          offDuty: 7,
          sleeperBerth: 7
        },
        {
          date: "2024-10-03",
          hoursDriven: 10,
          milesDriven: 600,
          dwellTime: 45,
          onDuty: 11,
          personal: 1,
          yardMove: 2,
          offDuty: 5,
          sleeperBerth: 8
        },
        {
          date: "2024-10-04",
          hoursDriven: 6,
          milesDriven: 300,
          dwellTime: 20,
          onDuty: 8,
          personal: 4,
          yardMove: 1,
          offDuty: 8,
          sleeperBerth: 6
        },
        {
          date: "2024-10-05",
          hoursDriven: 9,
          milesDriven: 550,
          dwellTime: 35,
          onDuty: 12,
          personal: 0,
          yardMove: 1.5,
          offDuty: 6,
          sleeperBerth: 7
        },
        {
          date: "2024-10-06",
          hoursDriven: 8.5,
          milesDriven: 400,
          dwellTime: 30,
          onDuty: 9.5,
          personal: 1,
          yardMove: 0.5,
          offDuty: 7,
          sleeperBerth: 6.5
        },
        {
          date: "2024-10-07",
          hoursDriven: 7,
          milesDriven: 480,
          dwellTime: 50,
          onDuty: 10,
          personal: 2,
          yardMove: 1,
          offDuty: 5,
          sleeperBerth: 8
        }
      ];
      
      
    return(
        <div>
        <CommonTable
        columns={columns}
        data={driverData}
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
export default DutyStatusReports;