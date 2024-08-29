import { ProfileImage } from "./profileImage"

export interface ProfileData {
    profileImage: ProfileImage
    name: String
    latestWorkPosition: String
    shortResume: String
}


export interface ProfileDataImage extends ProfileData {
    imageUrl: String
}