import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiCalls from "../../services/admin/apiCalls";
import { Report } from "../../state/admin";

const ReportTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    try {
      const { report } = await apiCalls.GetReportedPost();
      console.log(report);
      
      setReports(report);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleDelete = async (reportId: string,isDeleted: boolean) => {
    // toast(`Are you sure you want to delete?`, {
    //   position: "top-center",
    //   hideProgressBar: true,
    //   closeOnClick: true,
    //   theme: "light",
    // });

    try {
      const { message, success } = await apiCalls.DeletePost({ id: reportId , set: !isDeleted});
      console.log(message);

      if (success) {
        setReports((prevReports) =>
        prevReports.map((report) => {
          if (report.postId._id === reportId) {
            return {
              ...report,
              postId: {
                ...report.postId,
                isDeleted: !isDeleted
              }
            };
          }
          return report;
        })
      );
      
        toast(message, {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: true,
          theme: "light",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDismiss=async(reportId:string)=>{
    try {
      const {message}=await apiCalls.DismissReport({reportId:reportId})
      console.log(message);
      
      if(message){
        const updated=reports.filter((report)=>{
          return  report._id!=reportId
        })

        setReports(updated)
      }
    } catch (error) {
      console.log(error);
      
    }
   
  }

  const filteredData = reports.filter(
    (report) =>
      report?.reason?.includes(search.toLowerCase()) ||
      report?.postId?.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col py-4 px-2">
        <input
          type="text"
          placeholder="Search here"
          className="input input-bordered input-success w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Reason</th>
            <th>Description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((report: Report) => (
            <tr key={report?._id}>
              <td>
                {report?.postId?.picturePath.length <= 0 ? (
                  <p>No Image</p>
                ) : (
                  <img
                    src={report?.postId?.picturePath[0]}
                    alt="Post Image"
                    className="w-12 h-12"
                  />
                )}
              </td>
              <td>{report?.reason}</td>
              <td>{report?.postId?.description?.slice(0, 50)}</td>
              <td>
              <button
                  className={`btn ${report?.postId?.isDeleted ? "btn-info" : "btn-error"} btn-xs`}
                  onClick={() => handleDelete(report?.postId?._id, report?.postId?.isDeleted)}
                >
                  {report?.postId?.isDeleted ? "UN BLOCK" : "BLOCK"}
                </button>
              </td>
              <td>
            {report?.postId?.isDeleted && <button
                  className="btn btn-warning btn-xs"
                  onClick={() => handleDismiss(report?._id)}
                >
                  Dismiss
                </button>
            }  
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
