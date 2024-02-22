import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MutatingDots, Pagination } from "../../../components";
import {
  getAllAccount,
  getAllRoles,
  assignRoleForUser,
  removeRoleForUser,
} from "../../../api";
import { setAllUsers } from "../../../context/actions/allUsersAction";
import { setAllRoles } from "../../../context/actions/allRolesAction";
import { FaChevronRight, FaRegUser } from "react-icons/fa6";

function UsersList() {
  const allUsers = useSelector((state) => state?.allUsers?.allUsers);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [curentPageShowCourse, setCurentPageShowCourse] = useState([]);
  const [totalItems, setTotalItems] = useState();

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
      setCurentPageShowCourse([]);
      const firstItem = currentPage * itemsPerPage - itemsPerPage;
      if (firstItem >= allUsers.length) return;

      const lastIndex = Math.min(firstItem + itemsPerPage, allUsers.length);
      setCurentPageShowCourse(allUsers.slice(firstItem, lastIndex));
    }
  }, [currentPage, itemsPerPage, allUsers]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const choseItemPerPage = (itemNumber) => {
    setItemsPerPage(itemNumber);
  };

  const updateUserRole = async (userId) => {
    try {
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

  const chooseID = (userId, roleId) => {
    setSelectedRole({ userId, roleId });
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <MutatingDots />
        </div>
      ) : (
        <div className="flex flex-col p-8 text-gray-900">
          {/* title */}
          <div>
            <div className="flex items-center space-x-2 text-xl">
              <FaRegUser />
              <div>Menu </div>
              <FaChevronRight />
              <div>User Managament</div>
              <FaChevronRight />
            </div>
            <div className="text-2xl text-orange-400 font-semibold py-4">
              User List
            </div>
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
                {curentPageShowCourse.map((user, index) => (
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
                      <div className="bg-transparent border-gray-300 py-2 w-full text-wrap">
                        {user.role[0].name ||
                          user.role[1].name ||
                          user.role[2].name}
                      </div>
                    </td>
                    <td>
                      {selectedRole.userId === user.user.id ? (
                        <div className="p-3 px-5 flex justify-center items-center gap-3">
                          {!user?.role[0]?.name || !user?.role[1]?.name ? (
                            <button
                              type="button"
                              onClick={() =>
                                updateUserRole(selectedRole.userId)
                              }
                              className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                              Update
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                removeUserRole(selectedRole.userId)
                              }
                              className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline text-nowrap"
                            >
                              Remove Role
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedRole({ userId: 0, roleId: 0 })
                            }
                            className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="p-3 px-5 flex justify-center items-center">
                          <button
                            type="button"
                            onClick={() =>
                              chooseID(
                                user.user.id,
                                user.role[0].id ||
                                  user.role[1].id ||
                                  user.role[2].id
                              )
                            }
                            className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
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
      )}
    </>
  );
}

export default UsersList;
