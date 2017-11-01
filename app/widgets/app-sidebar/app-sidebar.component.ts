import { Component, Input } from '@angular/core';
import { PlatformContextNavigationService } from '../../_services/index';
import { PlatformNavigation } from '../../_models/index';

@Component( {
    selector: 'app-sidebar',
    styleUrls: ['./app/widgets/app-sidebar/app-sidebar.component.css'],
    templateUrl: './app/widgets/app-sidebar/app-sidebar.component.html'
})
export class AppSidebarComponent {
    navigations: PlatformNavigation[] = [];

    constructor(private platformContextNavigationService: PlatformContextNavigationService) { }

    ngOnInit() {
        // get users from secure api end point
        this.platformContextNavigationService.getContextNavigation()
            .subscribe(navigations => {
                this.navigations = navigations;
            });
    }
}
