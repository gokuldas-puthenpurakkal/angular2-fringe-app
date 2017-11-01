import { Component, OnInit } from '@angular/core';

import { User } from '../../_models/index';
import { UserService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    user: User = new User;

    constructor(private userService: UserService) { }

    ngOnInit() {
        // get users from secure api end point
        this.userService.getUser()
            .subscribe(user => {
                this.user = user;
            });
    }

}