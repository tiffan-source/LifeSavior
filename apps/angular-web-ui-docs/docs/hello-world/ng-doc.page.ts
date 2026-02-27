import {NgDocPage} from '@ng-doc/core';
import { WebAngularUi } from "@org/web-angular-ui"

const HelloWorldPage: NgDocPage = {
	title: `Hello World`,
	mdFile: './index.md',
  demos: {WebAngularUi}
};

export default HelloWorldPage;
