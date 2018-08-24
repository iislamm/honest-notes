import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { clientUrl } from '../app.module';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  results: any = [];
  ready: boolean;
  notfound: boolean;

  clientUrl: string;
  
  constructor(private userService: UserService, private auth: AuthService, private route: ActivatedRoute) {
    this.clientUrl = clientUrl();
  }

  ngOnInit() {
    this.search();
  }

  search() {
    let username = this.route.snapshot.paramMap.get('username');

    this.userService.search(username).subscribe(results => {
      let proccessed = 0;
      results.forEach(user => {
        proccessed++;
        user.avatarUrl = this.auth.customAvatarUrl(user._id);

        if (proccessed == results.length) {
          this.results = results;
        }
      });
      console.log(results);
    })
  }

}
