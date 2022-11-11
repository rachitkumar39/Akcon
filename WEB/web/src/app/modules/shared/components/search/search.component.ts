import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  userList: any;
  imagePath:any=environment.imageURL;
  pImage:any;
  temp:boolean=true;
  userData: any;
  constructor(
    private apiService:ApiService,
    private route:ActivatedRoute,
    private router:Router,
    private utility:UtilityService
  ) { }

  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    this.pImage="../../../../../../assets/images/profile-icon.png";
    //console.log(id);
    if(id!=''){
      this.apiService.searchById(id).subscribe((res)=>{
        if(res && res["errors"]== null){
          this.userList=res["response"];
          this.temp=true;
        }
        else{
          this.temp=false;
        }
      });
    }
    if(this.temp==false){
      alert("No Data found");
      this.router.navigate(['']);
    }
    this.userData=this.utility.UserProfile;
  }
  
  showProfile(id:any){
    this.router.navigate(['/profile',id]);
  }

}
