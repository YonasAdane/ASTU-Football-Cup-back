import cloudinary from "../../utils/cloudinary.js";
import { CreateClub, FindAllClubs } from "./club.service.js"

//Retrieves the list of all clubs.
async function getClubsHandler(req,res){
   const clubs=await  FindAllClubs();
   return res.json(clubs);
}
//Retrieves details of a specific club by ID.
async function clubsDetailsHandler(req,res){

}
//Creates a new football  club.
async function createClubHandler(req,res){
    const {name,coach,logo}=req.body;
    const uploadResult = await cloudinary.uploader
       .upload(
           logo, {
               folder:"ASTU-sport/club-logo"
           }
       )
    const club=await CreateClub(name,coach,uploadResult.publicId,uploadResult.logoUrl);
    return res.json(club);
} 
//Updates an existing football club by ID.
async function updateClubHandler(req,res){

}
//Deletes a football club by ID.
async function deleteClubHandler(req,res){
    const ClubId=req.params.id;
    const club=await DeleteClub(ClubId)
    return res.json(club);    
}
export {
    getClubsHandler,
    clubsDetailsHandler,
    createClubHandler,
    updateClubHandler,
    deleteClubHandler
}
