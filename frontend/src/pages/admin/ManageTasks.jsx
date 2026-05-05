import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axioInstance"
import TaskStatusTabs from "../../components/TaskStatusTabs"
import { FaFileLines } from "react-icons/fa6"
import TaskCard from "../../components/TaskCard"
import toast from "react-hot-toast"

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([])
  const [tabs, setTabs] = useState([])
  const [filterStatus, setFilterStatus] = useState("All")

  const navigate = useNavigate()

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get("/tasks", {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      })

      if (response?.data) {
        setAllTasks(response.data?.tasks || [])
      }

      const statusSummary = response.data?.statusSummary || {}

      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },
      ]

      setTabs(statusArray)
    } catch (error) {
      console.log("Error fetching tasks: ", error)
    }
  }

  const handleClick = (taskData) => {
    navigate("/admin/create-task", { state: { taskId: taskData._id } })
  }

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get("/reports/export/tasks", {
        responseType: "blob",
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")

      link.href = url
      link.setAttribute("download", "tasks_details.xlsx")
      document.body.appendChild(link)

      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log("Error downloading task-details report: ", error)
      toast.error("Error downloading task-details report. Please try again!")
    }
  }

  useEffect(() => {
    getAllTasks()
  }, [filterStatus])

  return (
    <DashboardLayout activeMenu={"Manage Task"}>
      <div className="my-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div className="flex items-center justify-between gap-4 w-full md:w-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              My Tasks
            </h2>

            <button
              className="md:hidden px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-sm hover:shadow-md cursor-pointer"
              onClick={handleDownloadReport}
              type="button"
            >
              Download
            </button>
          </div>

          {tabs.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />

              <button
                className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
                onClick={handleDownloadReport}
                type="button"
              >
                <FaFileLines className="text-lg" />
                <span>Download Report</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allTasks.length === 0 ? (
            <div className="col-span-3 flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaFileLines className="text-2xl text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">No tasks found</p>
              <p className="text-gray-400 text-sm mt-1">
                {filterStatus === "All"
                  ? "No tasks have been created yet."
                  : `No tasks with status "${filterStatus}".`}
              </p>
            </div>
          ) : (
            allTasks.map((item) => (
              <TaskCard
                key={item._id}
                title={item.title}
                description={item.description}
                priority={item.priority}
                status={item.status}
                progress={item.progress}
                createdAt={item.createdAt}
                dueDate={item.dueDate}
                assignedTo={item.assignedTo?.map((i) => i.profileImageUrl)}
                attachmentCount={item.attachments?.length || 0}
                completedTodoCount={item.completedTodoCount || 0}
                todoChecklist={item.todoChecklist || []}
                onClick={() => handleClick(item)}
              />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageTasks
