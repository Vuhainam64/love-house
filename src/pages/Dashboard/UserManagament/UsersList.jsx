import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { MutatingDots, Pagination } from "../../../components";
import { getAllAccount } from "../../../api";
import { setAllUsers } from "../../../context/actions/allUsersAction";

function UsersList() {
  const allUsers = useSelector((state) => state?.allUsers?.allUsers);
  const dispatch = useDispatch();

  const allRoles = [
    { roleId: 1, role_name: "Admin" },
    { roleId: 2, role_name: "Staff" },
    { roleId: 3, role_name: "Customer" },
  ];

  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState({}); // Changed to an object to store both role ID and user ID
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [curentPageShowCourse, setCurentPageShowCourse] = useState([]);
  const [totalItems, setTotalItems] = useState();

  const fetchAllUsers = async () => {
    try {
      const userData = await getAllAccount();
      dispatch(setAllUsers(userData));
    } catch (error) {
      console.error("Error fetching users:", error);
      dispatch(setAllUsers([]));
    }
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userData = await getAllAccount(1, 100);
        setLoading(false);
        dispatch(setAllUsers(userData?.result?.data));
      } catch (error) {
        console.error("Error fetching users:", error);
        dispatch(setAllUsers([]));
      }
    }

    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    if (allUsers) {
      setTotalItems(allUsers.length);
      setCurentPageShowCourse([]);
      const firstItem = currentPage * itemsPerPage - itemsPerPage;
      if (firstItem >= allUsers.length) return;

      const lastIndex = Math.min(firstItem + itemsPerPage, allUsers.length);
      setCurentPageShowCourse(allUsers.slice(firstItem, lastIndex));
      console.log("curentPageShowCourse: ", curentPageShowCourse);
    }
  }, [currentPage, itemsPerPage, allUsers]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const choseItemPerPage = (itemNumber) => {
    setItemsPerPage(itemNumber);
  };

  const updateUserRole = async () => {
    const updatedRole = parseInt(selectedRole.roleId);

    try {
      // Assuming you have an updateRole function
      // const updatedUser = await updateRole(selectedRole.userId, updatedRole);
      // Below is a placeholder since the updateRole function is not provided
      const updatedUser = { success: true };
      if (updatedUser.success) {
        console.log("User role updated successfully:", updatedUser);
        toast.success("Update User Successfully ~");
        fetchAllUsers();
        setSelectedRole({}); // Reset selected role after updating
      } else {
        console.error("Error updating user role");
      }
    } catch (error) {
      console.error("Error calling API to update user role:", error);
    }
  };

  const chooseID = (userId) => {
    setSelectedRole({ userId, roleId: 0 }); // Set roleId to 0 initially
    console.log("setSelectedRole: ", setSelectedRole);
  };

  return (
    <>
      {loading ? (
        <>
          <div className="flex items-center justify-center h-full">
            <MutatingDots />
          </div>
        </>
      ) : (
        <>
          <div className="text-gray-900">
            <div className="p-4 flex">
              <h1 className="text-3xl">Users</h1>
            </div>
            <div className="px-3 py-4 flex justify-center ">
              <table className="table-auto w-full border-collapse">
                <thead className="text-white h-10 px-5 py-1 bg-gray-700">
                  <tr className="text-left">
                    <th className="w-[20%] rounded-tl-lg">
                      <div className="h-full pl-5 items-center whitespace-nowrap">
                        <label>Name</label>
                      </div>
                    </th>
                    <th className="w-[20%] ">
                      <div className="h-full pl-5 whitespace-nowrap">
                        <label>Email</label>
                      </div>
                    </th>
                    <th className="w-[20%] ">
                      <div className="h-full pl-5 whitespace-nowrap">
                        <label>Verify</label>
                      </div>
                    </th>
                    <th className="w-[20%] ">
                      <div className="h-full text-center whitespace-nowrap">
                        <label>Role</label>
                      </div>
                    </th>
                    <th className="w-[20%] rounded-tr-lg">
                      <div className="h-full text-center whitespace-nowrap">
                        <label>Edit</label>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {curentPageShowCourse &&
                    curentPageShowCourse.map((user, index) => (
                      <tr
                        className="border-b hover:bg-orange-100 bg-white shadow-lg"
                        key={index}
                      >
                        <td className="p-3 px-5">
                          <div className="bg-transparent border-gray-300 py-2 w-full">
                            {user.user.firstName} {user.user.lastName}
                          </div>
                        </td>
                        <td className="p-3 px-5">
                          <div className="bg-transparent border-gray-300 py-2 w-full">
                            {user.user.email}
                          </div>
                        </td>
                        <td className="p-3 px-5">
                          <div className="bg-transparent border-gray-300 py-2 w-full">
                            {user.user.isVerified ? "verify" : "not verify"}
                          </div>
                        </td>
                        <td className="p-3 px-5 text-center">
                          {selectedRole.userId === user.id ? (
                            <select
                              onChange={(e) =>
                                setSelectedRole({
                                  ...selectedRole,
                                  roleId: e.target.value,
                                })
                              }
                              defaultValue={user.roleId}
                            >
                              {allRoles.map((role, index) => (
                                <option key={index} value={role.roleId}>
                                  {role.role_name}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div className="bg-transparent border-gray-300 py-2 w-full">
                              {roles.map((role) =>
                                role.roleId === user.roleId ? (
                                  <span key={role.roleId}>
                                    {role.role_name}
                                  </span>
                                ) : null
                              )}
                            </div>
                          )}
                        </td>

                        <td>
                          {selectedRole.userId === user.id ? (
                            <div className="p-3 px-5 flex justify-center items-center gap-3">
                              <button
                                type="button"
                                onClick={updateUserRole}
                                className="w-[40%] text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="w-[40%] text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                className="w-[40%] text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                onClick={() =>
                                  setSelectedRole({ userId: 0, roleId: 0 })
                                }
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="p-3 px-5 flex justify-center items-center">
                              <button
                                type="button"
                                className="w-[40%] text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => chooseID(user.id)}
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="w-full p-5">
              {totalItems && (
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={totalItems}
                  paginate={paginate}
                  choseItemPerPage={choseItemPerPage}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UsersList;
