import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Table, Button, Space, Pagination as AntPagination, Spin } from "antd";
import {
  getAllAccount,
  getAllRoles,
  assignRoleForUser,
  removeRoleForUser,
} from "../../../api";
import { setAllUsers } from "../../../context/actions/allUsersAction";
import { setAllRoles } from "../../../context/actions/allRolesAction";
import { FaChevronRight, FaRegUser } from "react-icons/fa6";

const UsersList = () => {
  const allUsers = useSelector((state) => state?.allUsers?.allUsers);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Set default items per page to 5
  const [totalItems, setTotalItems] = useState();
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userData = await getAllAccount(1, 100);
        dispatch(setAllUsers(userData.result.data));
      } catch (error) {
        console.log("Error fetching users:", error);
        dispatch(setAllUsers([]));
      }
    }

    async function fetchRoles() {
      try {
        const rolesData = await getAllRoles();
        dispatch(setAllRoles(rolesData.result.data));
      } catch (error) {
        console.log("Error fetching roles:", error);
        dispatch(setAllRoles([]));
      }
      setLoading(false);
    }

    fetchUsers();
    fetchRoles();
  }, [dispatch]);

  useEffect(() => {
    if (allUsers) {
      setTotalItems(allUsers.length);
      const firstItem = currentPage * itemsPerPage - itemsPerPage;
      if (firstItem >= allUsers.length) return;

      const lastIndex = Math.min(firstItem + itemsPerPage, allUsers.length);
      setCurrentItems(allUsers.slice(firstItem, lastIndex));
    }
  }, [currentPage, itemsPerPage, allUsers]);

  const chooseID = (userId, roleId) => {
    setSelectedRole({ userId, roleId });
  };

  const updateUserRole = async (userId) => {
    try {
      // Placeholder for the update user role functionality
      const updatedUser = await assignRoleForUser(userId);
      if (updatedUser?.isSuccess) {
        console.log("User role assigned successfully:", updatedUser);
        toast.success("Update User Successfully ~");
        setSelectedRole({});
      } else {
        console.error("Error assigning user role");
      }
    } catch (error) {
      console.error("Error calling API to assign user role:", error);
    }
  };

  const removeUserRole = async (userId) => {
    try {
      // Placeholder for the remove user role functionality
      const removedUser = await removeRoleForUser(userId);
      if (removedUser?.isSuccess) {
        console.log("User role removed successfully:", removedUser);
        toast.success("Remove User Role Successfully ~");
        setSelectedRole({});
      } else {
        console.error("Error removing user role");
      }
    } catch (error) {
      console.error("Error calling API to remove user role:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div
          key={record.user.id}
        >{`${record.user.firstName} ${record.user.lastName}`}</div>
      ),
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <div key={record.user.id}>{record.user.email}</div>
      ),
      width: "20%",
    },
    {
      title: "Verify",
      dataIndex: "verify",
      key: "verify",
      render: (text, record) => (
        <div key={record.user.id}>
          {record.user.isVerified ? "verify" : "not verify"}
        </div>
      ),
      width: "20%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) => (
        <div key={record.user.id}>
          {record.role[0]?.name || record.role[1]?.name || record.role[2]?.name}
        </div>
      ),
      width: "20%",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (text, record) => (
        <Space key={record.user.id}>
          {selectedRole.userId === record.user.id ? (
            <>
              {!record?.role[0]?.name || !record?.role[1]?.name ? (
                <Button
                  style={{ backgroundColor: "#1890ff", color: "#fff" }}
                  onClick={() => updateUserRole(record.user.id)}
                >
                  Update Permission
                </Button>
              ) : (
                <Button
                  style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
                  onClick={() => removeUserRole(record.user.id)}
                >
                  Remove Role
                </Button>
              )}
              <Button onClick={() => setSelectedRole({ userId: 0, roleId: 0 })}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              style={{ backgroundColor: "#1890ff", color: "#fff" }}
              onClick={() =>
                chooseID(
                  record.user.id,
                  record.role[0]?.id || record.role[1]?.id || record.role[2]?.id
                )
              }
            >
              Edit
            </Button>
          )}
        </Space>
      ),
      width: "20%",
    },
  ];

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onItemsPerPageChange = (current, size) => {
    setItemsPerPage(size);
  };

  return (
    <>
      <Spin spinning={loading}>
        <div className="flex flex-col p-8 px-20 text-gray-900 pb-32 mb-12 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {/* title */}
          <div>
            <div className="flex items-center space-x-2 text-xl">
              <FaRegUser />
              <div>Menu </div>
              <FaChevronRight />
              <div>User Managament</div>
              <FaChevronRight />
            </div>
            <div className="text-2xl text-green-400 font-semibold py-4">
              User List
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={currentItems}
            pagination={false}
          />
          <div className="w-full p-5">
            {totalItems && (
              <AntPagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={totalItems}
                onChange={onPageChange}
                showSizeChanger
                onShowSizeChange={onItemsPerPageChange}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
              />
            )}
          </div>
        </div>
      </Spin>
    </>
  );
};

export default UsersList;
