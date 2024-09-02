import { ProfileImage } from "./profileImage"

export interface ProfileData {
    profileImage: ProfileImage,
    name: String,
    latestWorkPosition: String,
    shortResume?: String | undefined,
}

export interface AboutProfile {
    dateOfBirth?: Date | undefined,
    address?: String | undefined,
    primaryPhoneNumber?: String | undefined,
    languages?: String | undefined,
    skype?: String | undefined,
    firstName?: String | undefined,
    lastName?: String | undefined,
    age?: Number | undefined,
    nationality?: String | undefined,
}

export interface ProfileDataImage extends ProfileData {
    imageUrl: String
}