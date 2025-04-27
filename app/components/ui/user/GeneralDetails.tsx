import { Typography } from '@mui/material'
import React from 'react'

interface GeneralDetailsProps {
    dob: string;
    phone_number: string;
    email: string
}


const GeneralDetails: React.FC<GeneralDetailsProps> = ({dob, phone_number, email}) => {
  return (
        

    
            <div className="space-y-5 text-black ">
              <div>
                <Typography 
                sx={{fontWeight:"500", fontSize: "16px", fontFamily: "poppins"}}
                >Date Of Birth</Typography>

                <Typography sx={{fontWeight:"400", fontSize: "14px", fontFamily: "poppins"}}>{dob}</Typography>
              </div>
              <div >
                <Typography
                
                
                sx={{fontWeight:"500", fontSize: "16px", fontFamily: "poppins"}}>Phone Number</Typography>
                <Typography sx={{fontWeight:"400", fontSize: "14px", fontFamily: "poppins"}}>{phone_number}</Typography>
              </div>
              <div>
                <Typography
                sx={{fontWeight:"500", fontSize: "16px", fontFamily: "poppins"}}
                
                >Email</Typography>
                <Typography sx={{fontWeight:"400", fontSize: "14px", fontFamily: "poppins"}}>{email}</Typography>
              </div>
            </div>
  )
}

export default GeneralDetails