"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import campaignimage from "@/app/assets/campaign.avif";
import { useRouter } from "next/navigation";
import CampaignCard from "@/Components/CampaignCard";

export default function AllCampaigns() {
  

  const RandomImagePicker=()=>{
    const imageArray = [
      "https://images.pexels.com/photos/13119652/pexels-photo-13119652.jpeg",
      "https://images.pexels.com/photos/27303505/pexels-photo-27303505/free-photo-of-a-dog-is-standing-on-a-mountain-with-a-mountain-in-the-background.jpeg",
      "https://images.pexels.com/photos/20605716/pexels-photo-20605716/free-photo-of-people-on-one-horse-shay.jpeg",
      "https://images.pexels.com/photos/29575236/pexels-photo-29575236/free-photo-of-charming-porticoed-street-in-bologna-italy.jpeg",
      "https://images.pexels.com/photos/29452562/pexels-photo-29452562/free-photo-of-vibrant-red-outdoor-bench-and-table-in-rain.jpeg",
      "https://images.pexels.com/photos/27559206/pexels-photo-27559206/free-photo-of-a-group-of-people-standing-on-the-beach.jpeg"

    ];

    return imageArray[Math.floor(Math.random()*(5-0+1))];
  }
  const [campaigns, setCampaigns] = useState([]);
   const Campaigns = [
     {
       id: 1,
       campaignTitle: "Clean Water Initiative",
       description:
         "Help provide access to clean water in underprivileged communities.",
       target: 10000, // Target amount to raise
       deadline: 1672531199, // Unix timestamp for deadline
       image: "https://example.com/images/clean-water.jpg", // Replace with actual image URL
       amountCollected: 5000, // Amount collected so far
     },
     {
       id: 2,
       campaignTitle: "Tree Planting Drive",
       description: "Join us in planting trees to combat climate change.",
       target: 15000,
       deadline: 1675209599,
       image: "https://example.com/images/tree-planting.jpg",
       amountCollected: 7000,
     },
     {
       id: 3,
       campaignTitle: "Support Local Artists",
       description:
         "Donate to support local artists and their creative projects.",
       target: 5000,
       deadline: 1677753600,
       image: "https://example.com/images/local-artists.jpg",
       amountCollected: 2000,
     },
     {
       id: 4,
       campaignTitle: "Food Security Program",
       description: "Help us provide food for those in need.",
       target: 20000,
       deadline: 1680336000,
       image: "https://example.com/images/food-security.jpg",
       amountCollected: 12000,
     },
     {
       id: 5,
       campaignTitle: "Animal Rescue Fund",
       description: "Contribute to the rescue and care of abandoned animals.",
       target: 8000,
       deadline: 1683033600,
       image: "https://example.com/images/animal-rescue.jpg",
       amountCollected: 3000,
     },
   ];
   const router = useRouter();
  useEffect(() => {
    const fetchdata = async () => {
      try{

        const response = await axios.get(
          "http://localhost:3000/apis/getCampaigns"
        );
        // console.log("this is the all data" + JSON.stringify(response));

        const data=response.data.campaigns;
         const transformedCampaigns= data.titles.map(
           (title: string, index: number) => ({
             id: index,
             campaignTitle: title,
             description: data.descriptions[index] || "",
             target: parseInt(data.targets[index] || "0", 10),
             deadline: parseInt(data.deadlines[index] || "0", 10),
             image: campaignimage, // Placeholder image
             amountCollected: parseInt(data.amountsCollected[index] || "0", 10),
           })
         );

         setCampaigns(transformedCampaigns);

      }catch( e){
        console.log("this is the error of useEffect"+e.message)
      }

    };

     fetchdata();
  }, []);

   return (
     <>
       <div className="flex justify-between mx-10">
         <h1 className="text-4xl font-bold">Campaigns</h1>
         <div>
           <button
             className="px-6 font-medium py-2 rounded-3xl bg-green-500 shadow-lg shadow-green-500 
             transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:shadow-indigo-500 duration-300 mt-4"
             onClick={() => {
               console.log("this is clicked");
               router.push("/pages/CreateCampaign");
             }}
           >
             Add Campaigns
           </button>

           <button
             className="px-6 font-medium py-2 rounded-3xl bg-green-500 shadow-lg shadow-green-500 
             transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:shadow-indigo-500 duration-300 ml-4 mt-4"
             onClick={() => {
               console.log("this is clicked");
               router.push("/pages/myTokens");
             }}
           >
             My Company Tokens
           </button>
         </div>
       </div>
       <div className="flex flex-col items-center p-8 gap-6 md:flex-row flex-wrap justify-center">
         {campaigns.map((campaign) => (
           <CampaignCard
             key={campaign.id}
             id={campaign.id}
             campaignTitle={campaign.campaignTitle}
             description={campaign.description}
             target={campaign.target}
             deadline={campaign.deadline}
             image={RandomImagePicker()}
             amountCollected={campaign.amountCollected}
           />
         ))}
       </div>
     </>
   );
}
