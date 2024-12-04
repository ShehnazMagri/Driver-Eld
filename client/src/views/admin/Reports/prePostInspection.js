import CommonTable from "components/common/CommanTable";

const PrePostInspection = () => {
    const columns = [
        { title: "Name", field: "name" },
        { title: "# of Post/pre trip DVIR", field: "numberOfDVIR" },
        { title: "Defects reported post/pre trip", field: "defectsReported" },
        { title: "SAE", field: "sae" }
      ];
      
      const dvirData = [
        {
          name: "John Doe",
          numberOfDVIR: 5,
          defectsReported: 2,
          sae: "None"
        },
        {
          name: "Jane Smith",
          numberOfDVIR: 8,
          defectsReported: 3,
          sae: "Minor"
        },
        {
          name: "Emily Johnson",
          numberOfDVIR: 6,
          defectsReported: 1,
          sae: "Major"
        },
        {
          name: "Michael Brown",
          numberOfDVIR: 10,
          defectsReported: 4,
          sae: "Minor"
        },
        {
          name: "Jessica Williams",
          numberOfDVIR: 3,
          defectsReported: 0,
          sae: "None"
        },
        {
          name: "David Wilson",
          numberOfDVIR: 7,
          defectsReported: 2,
          sae: "Major"
        },
        {
          name: "Sarah Taylor",
          numberOfDVIR: 4,
          defectsReported: 1,
          sae: "None"
        }
      ];
      
      
    return(
        <div>
        <CommonTable
        columns={columns}
        data={dvirData}
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
export default PrePostInspection;