import { Typography } from "@mui/material";
import React from "react";

interface EngagementDetailsProps {
  subscription: "Premium" | "Free" | "Standard";
  likedVideos: number;
  saved: number;
  joinDate: string;
}

const EngagementDetails: React.FC<EngagementDetailsProps> = ({
  subscription,
  likedVideos,
  saved,
  joinDate,
}) => {
  return (
    <div className="space-y-4 text-black">
      <div>
        <Typography sx={{fontWeight:"500", fontSize: "16px", fontFamily: "poppins"}}>
          Subscription
        </Typography>
        <Typography
          sx={{
            fontWeight:"700", fontSize: "14px", fontFamily: "poppins",

            color:
              subscription === "Premium"
                ? "#895CAB"
                : subscription === "Free"
                ? "#00AB44"
                : "#3D50DF",
          }}
         
        >
          {subscription}
        </Typography>
      </div>
      <div>
        <Typography sx={{fontWeight:"500", fontSize: "16px", fontFamily: "poppins"}}>
          Liked Videos
        </Typography>
        <Typography sx={{fontWeight:"400", fontSize: "14px",fontFamily: "poppins"}}>{likedVideos}</Typography>
      </div>
      <div>
        <Typography sx={{fontWeight:"500", fontSize: "16px", fontFamily: "poppins"}}>
          Saved
        </Typography>
        <Typography sx={{fontWeight:"400", fontSize: "14px", fontFamily: "poppins"}}>{saved}</Typography>
      </div>
      <div>
        <Typography sx={{fontWeight:"500", fontSize: "16px", fontFamily: "poppins"}}>
          Date Joined
        </Typography>
        <Typography sx={{fontWeight:"400", fontSize: "14px", fontFamily: "poppins"}}>{joinDate}</Typography>
      </div>
    </div>
  );
};

export default EngagementDetails;
