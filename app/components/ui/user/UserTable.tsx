"use client";
import React, { useEffect, useState } from "react";
import UserTableRow from "./UserTableRow";
import GenericTable from "../common/GenericTable";
import UserProfile from "./UserProfile";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "@mui/material";
import {
  useGetUsersByFiltersQuery,
  useGetUsersListQuery,
} from "@/store/thunks/userManagementThunk";
import CircularProgress from "@mui/material/CircularProgress";
import {ApiResponse} from "../../../../store/thunks/userManagementThunk"
export type SubscriptionType = "All" | "Premium" | "Standard";

interface UserTableProps {
  subscriptionType: SubscriptionType;
  userType: string;
}



export interface UserDataType {
  name: string;
  email: string;
  phone_number: string;
  planTitle: "Free" | "Premium" | "Standard";
  dob: string;
  liked_videos: number;
  saved_videos: number;
  createdAt: string;
  isCustomVideoAssigned: Boolean;
  customVideoTitle: string | null;
  customVideoDescription: string | null;
  customVideoId: string | null;
  userId: string | null;
  customVideo: string;
  profile_picture: string;
  customVideoThumbnail: string;
  onView: () => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  subscriptionType,
  userType,
}) => {
  const [page, setPage] = useState(1);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState<UserDataType>();
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [limit, setLimit] = useState(5)

  
  const {
    data: planBasedFilteredData,
    error: filteredDataError,
    isLoading: filteredDataLoading,
    refetch: refetchFilteredData,
  } = subscriptionType !== "All"
  ? useGetUsersByFiltersQuery({ filter: subscriptionType, page, limit :10})
  : { data: [], isLoading: false, error: null, refetch: () => {} };
  const [response, setResponse] = useState<any>();

  const {
    data: usersListData,
    error,
    isLoading: isUsersListLoading,
    refetch
  } = useGetUsersListQuery({page , limit: 10});

  const pagination =
  subscriptionType === "All"
    ? (usersListData as ApiResponse)?.pagination?.totalPages
    : (planBasedFilteredData as ApiResponse)?.pagination?.totalPages;
  useEffect(() => {
    // This ensures users are updated when either of the queries return
    if (subscriptionType === "All") {
      setResponse(usersListData?.data);
    } else if (
      subscriptionType === "Premium" ||
      subscriptionType === "Standard"
    ) {
      if (planBasedFilteredData) {
        if ("data" in planBasedFilteredData){
          const fetchData = planBasedFilteredData as { data : any};
          console.log("[FETCH DATA]:",fetchData);
          setResponse(fetchData?.data);
        }
        // setResponse([]);
      } else {
        // setResponse(planBasedFilteredData?.data);
      }
    }

    if (filteredDataError) {
      if ("data" in filteredDataError) {
        const fetchError = error as { data: { message: string } };
        console.log("[ERROR WHILE FETCHING INSIGHTS]:", fetchError);
        // setResponseMessage(fetchError?.data?.message  || "An error occurred." );
                setResponseMessage(fetchError?.data?.message);

        // || "An error occurred."
        console.log("[responseMessage]:", responseMessage);
      } else {
        console.log("[ERROR]:", error);
        setResponseMessage("An unknown error occurred.");
      }
    }

    if (error) {
      console.log("[All Users Error]:", error);
      if ("data" in error) {
        const fetchError = error as { data: { message: string } };
        setResponseMessage(fetchError?.data?.message);
      } else {
        setResponseMessage("An unknown error occurred.");
      }
    }
  }, [
    usersListData,
    planBasedFilteredData,
    subscriptionType,
    responseMessage,
    error,
  ]);

  const rowsPerPage = 10;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const fetchUsers = async () => {
    const response = await axios.get("/api/users");
    return response.data;
  };

  const handleShowUserDetails = (userData: UserDataType) => {
    setSelectedUserData(userData);
    setShowUserDetails(!showUserDetails);
  };

  const headerData = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "phoneNumber", label: "Phone Number" },
    { id: "subscription", label: "Subscription" },
    { id: "action", label: "Action" },
  ];

  const checkSubscriptionType = () => {
    if (subscriptionType === "All") {
      return "List of Users";
    }
    return `${subscriptionType} Users`;
  };

  useEffect(() => {
    console.log("[RESPONSE]:", response);
  }, [response]);

  if (isUsersListLoading || filteredDataLoading) {
    return (
      <div className="flex h-[60vh] w-full justify-center items-center my-15">
        <CircularProgress size={40} />
      </div>
    );
  }

  // if (error) return <div>Error loading categories</div>;

  const renderRow = (row: any, index: number) => (
    <UserTableRow
      key={index}
      name={row.name}
      email={row.email}
      phoneNumber={row.phone_number}
      subscription={row.planTitle}
      onView={() => handleShowUserDetails(row)}
    />
  );

  return (
    <>
      <div className="flex items-center justify-between my-5">
        {responseMessage ? (
          <></>
        ) : (
          <Typography
            marginTop="4px"
            marginLeft="22px"
            sx={{
              color: "#000",
              fontWeight: "700",
              fontSize: "24px",
              fontFamily: "poppins",
            }}
            className="font-poppins"
          >
            {userType}
          </Typography>
        )}
      </div>

      {showUserDetails && (
        <UserProfile
          userDetails={selectedUserData}
          handleShowUserDetails={() => setShowUserDetails(false)}
          refetchUserEntries={refetchFilteredData || refetch}
          showUserDetails ={ showUserDetails}
        />
      )}

      {responseMessage ? (
        <div className="flex h-full w-full justify-center items-center my-8">
          <p className="text-black">{responseMessage}</p>
        </div>
      ) : (
        <>
          {response?.length === 0 || response === undefined ? (
            <div className="text-center mt-4">
              <Typography className="text-black" variant="h6">
                {`There are no users to show in the ${subscriptionType.toLowerCase()} plan.`}
              </Typography>
            </div>
          ) : (
            <GenericTable
              tableName={checkSubscriptionType()}
              headerData={headerData}
              rowsData={response}
              rowsPerPage={rowsPerPage}
              page={page}
              handlePageChange={handlePageChange}
              renderRow={renderRow}
              totalPages={pagination}
            />
          )}
        </>
      )}
    </>  
  );
};
