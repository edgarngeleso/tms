import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.css";
import { Button, Card, CardGroup, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGet, usePost } from "../../hooks";
import { DataURLS } from "../../utils/DataURLS";

const Profile = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [activeTab, setActiveTab] = useState(0);
  const [userInfo,setUserInfo] = useContext(UserContext);

  const btnsRef = useRef();
  
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem("app_user");

    setUserData({ loggedIn: false, data: {} });
  };

  const [refresh, setRfresh] = useState(false);
  // console.log(userInfo.data.user._id);
  const bookings = useGet({
    url: DataURLS.userBookings/*`${DataURLS.userBookings}/${userInfo?.data?.user?._id}`*/,
    options:{
      method:"GET",
      headers: {
        "Authorization":`Bearer ${userInfo?.data?.token}`,
      },
    },
    dependecies: [refresh],
  });

  useEffect(() => {
    //setUserData({loggedIn:true});
    if (!userData.loggedIn) {
      navigate("/");
    }
  }, [userData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="content-wrapper profile">
      <div className="btns" ref={btnsRef}>
        <FaChevronLeft
          onClick={() => {
            btnsRef.current.scrollLeft += /*btnsRef.current.getBoundingClientRect().width+*/ 100;
          }}
          className="btns-arrows left"
        />
        <FaChevronRight
          onClick={() => {
            btnsRef.current.scrollLeft -= /*btnsRef.current.getBoundingClientRect().width+*/ 100;
          }}
          className="btns-arrows right"
        />
        <Button
          onClick={() => setActiveTab(0)}
          style={{
            backgroundColor: activeTab == 0 ? "var(--app-color)" : "#ffffff",
            color: activeTab == 0 ? "#ffffff" : "var(--app-color)",
            borderColor: "transparent",
          }}
        >
          Dashboard
        </Button>
        <Button
          onClick={() => setActiveTab(1)}
          style={{
            backgroundColor: activeTab == 1 ? "var(--app-color)" : "#ffffff",
            color: activeTab == 1 ? "#ffffff" : "var(--app-color)",
            borderColor: "transparent",
            width: "fit-content",
          }}
        >
          Bookings
        </Button>
        <Button
          onClick={() => setActiveTab(2)}
          style={{
            backgroundColor: activeTab == 2 ? "var(--app-color)" : "#ffffff",
            color: activeTab == 2 ? "#ffffff" : "var(--app-color)",
            borderColor: "transparent",
            width: "fit-content",
          }}
        >
          Update Profile
        </Button>
        <Button
          onClick={() => setActiveTab(3)}
          style={{
            backgroundColor: activeTab == 3 ? "var(--app-color)" : "#ffffff",
            color: activeTab == 3 ? "#ffffff" : "var(--app-color)",
            borderColor: "transparent",
            width: "fit-content",
          }}
        >
          Change password
        </Button>
        <Button
          onClick={() => logout()}
          variant="danger"
          style={{
            borderColor: "transparent",
            width: "fit-content",
          }}
        >
          Logout
        </Button>
      </div>

      <div
        style={{
          width: "80%",
        }}
      >
        {activeTab == 0 ? (
          <Dashboard bookings={bookings} />
        ) : activeTab == 1 ? (
          <Bookings bookings={bookings} />
        ) : activeTab == 2 ? (
          <EditProfile />
        ) : (
          <ChangePassword />
        )}
      </div>
    </div>
  );
};

const Dashboard = ({ bookings }) => {
  const active = bookings.results.filter((b) => b.canceled == false).length;
  const canceled = bookings.results.filter((b) => b.canceled == true).length;

  return (
    <div className="profile-container">
      <CardGroup
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <Card className="profile-card">
          <label>{bookings.results.length}</label>
          <p>Total Bookings</p>
        </Card>

        <Card className="profile-card">
          <label>{active}</label>
          <p>Active bookings</p>
        </Card>

        <Card className="profile-card">
          <label>{canceled}</label>
          <p>Canceled bookings</p>
        </Card>
      </CardGroup>
    </div>
  );
};

const Bookings = () => {
  const [refresh, setRfresh] = useState(false);
  const [userInfo,setUserInfo] = useContext(UserContext);
  
  const bookings = useGet({
    url:DataURLS.userBookings/*`${DataURLS.userBookings}/${userInfo?.data?.user?._id}`*/,
    options:{
      method:"GET",
      headers: {
        "Authorization":`Bearer ${userInfo?.data?.token}`,
      },
    },
    dependecies: [refresh],
  });

  const editBooking = usePost({
    url: DataURLS.editBooking,
    setReload: setRfresh,
    reload: refresh,
  });

  const deleteBooking = usePost({
    url: DataURLS.deleteBooking,
    setReload: setRfresh,
    reload: refresh,
  });

  return (
    <div
      className="profile-container"
      style={{
        width: "100%",
      }}
    >
      {bookings.error ? (
        <div>{bookings.message}</div>
      ) : bookings.loading ? (
        <div>Loading...</div>
      ) : bookings.results.length < 1 ? (
        <div>No results found!!</div>
      ) : (
        <Table
          responsive
          style={{
            width: "100%",
            gap: 10,
          }}
        >
          <thead>
            <th>#</th>
            <th>Company</th>
            <th>From</th>
            <th>To</th>
            <th>Ticket type</th>
            <th>Payment type</th>
            <th>Amount</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {bookings.results.map((booking, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{booking?.company}</td>
                  <td>{booking?.from}</td>
                  <td>{booking?.to}</td>
                  <td>{booking?.ticket}</td>
                  <td>{booking?.paymentType ?? "M_PESA"}</td>
                  <td>{booking?.amount}</td>
                  <td>
                    {/* <Button variant='danger' >Update status</Button> */}
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteBooking.handleRequest(
                          `
                      ${DataURLS.deleteBooking}/${booking._id}
                      `,
                          {
                            method: "DELETE",
                            headers: {
                              "Authorization":`Bearer ${userInfo?.data?.token}`,
                              Accept: "Application/json",
                              "Content-Type": "Application/json",
                            },
                          }
                        );
                      }}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

const EditProfile = () => {
  const [refresh,setRfresh] = useState(false);
  const [userInfo,setUserInfo] = useContext(UserContext);
  const [credentials,setCredentials] = useState({
    userid:userInfo.data.user._id,
    name:userInfo.data.user.name,
    email:userInfo.data.user.email,
    phone:userInfo.data.user.phone,
  });
  
  
  const editProfile = usePost({
    url: DataURLS.editProfile,
    setReload: setRfresh,
    reload: refresh,
  });


  return (
    <div className="profile-container">
      <div>Edit profile</div>
      <div>
        <div className="user-input">
          <label>Name</label>
          <input
          onChange={(e)=>setCredentials({...credentials,name:e.target.value})}
          value={credentials.name}
          type="text" required placeholder="name..." />
        </div>
        <div className="user-input">
          <label>Email</label>
          <input
          onChange={(e)=>setCredentials({...credentials,email:e.target.value})}
          value={credentials.email}
          type="email" required placeholder="email..." />
        </div>
        <div className="user-input">
          <label>Phone number</label>
          <input
          onChange={(e)=>setCredentials({...credentials,phone:e.target.value})}
          value={credentials.phone}
          type="text" required placeholder="phone..." />
        </div>
        <Button variant="success"
        onClick={()=>{
          editProfile.handleRequest(null,{
            method:"PUT",
            headers:{
              "Authorization":`Bearer ${userInfo.data.token}`,
              "Accept":"Application/json",
              "Content-Type":"Application/json"
            },
            body:{...credentials,userid:userInfo.data.user._id}
          })
        }}
        >Update Details</Button>
      </div>
    </div>
  );
};

const ChangePassword = () => {
  const [refresh,setRfresh] = useState(false);
  const [userInfo,setUserInfo] = useContext(UserContext);


  const [credentials,setCredentials] = useState({
    old_password:null,
    new_password:null
  });

  const editPassword = usePost({
    url: DataURLS.editPassword,
    setReload: setRfresh,
    reload: refresh,
  });
  return (
    <div className="profile-container">
      <div>Change password</div>
      <div>
        <div className="user-input">
          <label>Old password</label>
          <input onChange={(e)=>setCredentials({...credentials,old_password:e.target.value})} type="password" required placeholder="old password..." />
        </div>
        <div className="user-input">
          <label>New password</label>
          <input onChange={(e)=>setCredentials({...credentials,new_password:e.target.value})} type="password" required placeholder="new password..." />
        </div>
        <div className="user-input">
          <label>Re-enter password</label>
          <input type="password" required placeholder="reenter password..." />
        </div>
        <Button variant="success"
        disabled={!credentials.old_password || !credentials.new_password}
        onClick={()=>{
          editPassword.handleRequest(null,{
            method:"PUT",
            headers:{
              "Accept":"Application/json",
              "Content-Type":"Application/json"
            },
            body:{...credentials,userid:userInfo.data.user._id}
          })
        }}
        >Update Password</Button>
      </div>
    </div>
  );
};

export default Profile;
