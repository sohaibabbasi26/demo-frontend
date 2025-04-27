import { NextResponse } from "next/server";

export const dynamic = "force-static"; 


export async function GET() {
    
  const rowsData = [
    {
      name: "John Hills",
      email: "johnhills@gmail.com",
      phoneNumber: "+1 (321) 123 1234",
      subscription: "Free",
      dateOfBirth: "12/12/24",
      likedVideos: 23,
      saved: 30,
      profileImage: "/images/placeholder-3.jpg",
      joinDate: "12/2/2024",
      onView: () => console.log("View clicked"),
    },

    {
      name: "John Hills 2",
      email: "johnhills@gmail.com",
      phoneNumber: "+1 (321) 123 1234",
      subscription: "Premium",
      dateOfBirth: "12/12/24",
      likedVideos: 23,
      saved: 30,
      profileImage: "/images/placeholder-3.jpg",
      joinDate: "12/2/2024",
      // customVideoDetails: "pending",
      customVideoDetails: "uploaded",
      onView: () => console.log("View clicked"),
    },
    {
      name: "John Hills 3",
      email: "johnhills@gmail.com",
      phoneNumber: "+1 (321) 123 1234",
      subscription: "Premium",
      dateOfBirth: "12/12/24",
      likedVideos: 23,
      saved: 30,
      profileImage: "/images/placeholder-3.jpg",
      joinDate: "12/2/2024",
      customVideoDetails: "pending",
      onView: () => console.log("View clicked"),
    },
    {
      name: "John Hills 4",
      email: "johnhills@gmail.com",
      phoneNumber: "+1 (321) 123 1234",
      subscription: "Standard",
      dateOfBirth: "12/12/24",
      likedVideos: 23,
      saved: 30,
      profileImage: "/images/placeholder-3.jpg",
      joinDate: "12/2/2024",
      onView: () => console.log("View clicked"),
    },
  ];
   return NextResponse.json(rowsData);
}