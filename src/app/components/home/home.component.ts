import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContentfullService } from '../../services/contentfull/contentfull.service';
import { ProfileData, ProfileDataImage } from '../../interfaces/contactInterfaces/profileData';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  profileWithImage!: ProfileDataImage;
  constructor(private contentfullService: ContentfullService) { }

  async ngOnInit(): Promise<void> {
    var profileData: ProfileDataImage = await this.contentfullService.getProfileInformation()
      .then((field: ProfileData) => {

        let profileData: ProfileDataImage = {
          name: field.name,
          shortResume: field.shortResume,
          profileImage: field.profileImage,
          latestWorkPosition: field.latestWorkPosition,
          imageUrl: ''
        }

        return profileData;
      });

    var assetUrl: String = await this.contentfullService.getAsset(profileData?.profileImage.sys.id);
    profileData.imageUrl = assetUrl;

    this.profileWithImage = profileData;

    console.log({ profileWithImage: this.profileWithImage });
  }
} 
