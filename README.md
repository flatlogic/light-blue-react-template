# 🤘 Light Blue React Template

Free and open-source admin dashboard template built with React and Bootstrap 4. Developed with ❤️ by [Flatlogic](https://flatlogic.com/). If you love our project please star ⭐️ our repo!

**Development at risk! Our developer wants to eat and accepted a job offer from McDonalds! Buy a [full version of Light Blue React](https://flatlogic.com/templates/light-blue-react) to help us hire him again!** *

[View Demo](https://flatlogic.github.io/light-blue-react-template/) | [Download](https://github.com/flatlogic/light-blue-react-template.git) | [More templates](https://flatlogic.com/templates)

[![image](https://user-images.githubusercontent.com/43149862/78150582-270b4380-7440-11ea-826a-64e99b77d06d.png)](https://flatlogic.github.io/light-blue-react-template/)

This dashboard, a lite version (containing only a few components) of our [Light Blue React](https://flatlogic.com/templates/light-blue-react), showcases a subset of the ready-to-use components available in the full version, designed to give developers a preview of its comprehensive capabilities. Constructed on the foundation of React 16, it enjoys broad support across the web, making it an ideal starting point for developing [business software](https://flatlogic.com/) with a modern, user-friendly interface. You can easily customize the template by changing SCSS variables. All paddings and colors are in _variables.scss file.

## Features

Light Blue React Template is a great template to quick-start development of SAAS, CMS, IoT Dashboard, E-Commerce apps, etc  
Lite version of a Light Blue includes following features and pages:

* Bootstrap 4+ & SCSS
* Responsive layout
* React Chart.js
* Simple login / logout 
* Error page
* Styled Bootstrap components like buttons, modals, etc


## Pages
We have implemented some basic pages, so you can see our template in action.

* Dashboard sample
* Typography
* Tables
* Notifications
* Charts
* Icons
* Maps
* Chat
* Login
* Error page

## Instalation 

1. Clone repository
```shell
git clone https://github.com/flatlogic/light-blue-react-template.git
```
2. Get in the project folder
```shell
cd light-blue-react-template
```
3. Install dependencies via npm or yarn
```shell
npm install
```
```shell
yarn
```

## Quick start
Run development server
```shell
yarn run
```

## Support
For any additional information please refer to [Flatlogic homepage](https://flatlogic.com).

## How can I support developers?
- Star our GitHub repo :star:
- [Tweet about it](https://twitter.com/intent/tweet?text=Amazing%20dashboard%20built%20with%20%23VueJS%20and%20%23Bootstrap!&url=https://github.com/flatlogic/light-blue-vue-admin&via=flatlogic).
- Create pull requests, submit bugs, suggest new features or documentation updates :wrench:
- Follow [@flatlogic on Twitter](https://twitter.com/flatlogic).
- Subscribe to Flatlogic newsletter at [flatlogic.com](https://flatlogic.com/)
- Like our page on [Facebook](https://www.facebook.com/flatlogic/) :thumbsup:

## More from Flatlogic
- [Awesome Bootstrap Checkboxes & Radios](https://github.com/flatlogic/awesome-bootstrap-checkbox) - ✅ Pure css way to make inputs look prettier
- [React Native Starter](https://github.com/flatlogic/react-native-starter) - 🚀 A powerful react native starter template that bootstraps development of your mobile application
- [React Dashboard](https://github.com/flatlogic/react-dashboard) - 🔥 React Dashboard - isomorphic admin dashboard template with GraphQL
- [Sing App](https://github.com/flatlogic/sing-app) - 💥 Free and open-source admin dashboard template built with Bootstrap 4
- [Light Blue Dashboard](https://github.com/flatlogic/light-blue-dashboard) - 💦 Free and open-source (no frameworks) admin dashboard template built with Bootstrap

## Premium themes
Looking for premium themes and templates? Check out our other template at [flatlogic.com](https://flatlogic.com/admin-dashboards).

## License

Light Blue React Template version is [MIT](https://github.com/flatlogic/light-blue-react-template/blob/master/LICENCE)-licensed.

* that's a joke actually, but we would really appreciate if you support us by buying a premium version. Anyways free is just free and is limited to only few components, while premium one has more and comes with premium support.

## Dependency maintenance and local checks

Use Node.js 22.12 or newer and npm. `npm ci` installs the canonical
`package-lock.json`; the superseded Yarn lock is removed after checking the
resolved dependency graph. Vite replaces the ejected Webpack 4/CRA build tools
without changing React, routing, SCSS, or dashboard pages.

- `npm start`: development server.
- `npm run build`: production output in `build/`.
- `npm test`: regression tests against the production build using installed Google Chrome.
- `npm audit`: all production and development dependencies.

The previous Layout test depended on undeclared Enzyme/Chai packages and passed
children to a layout that renders routes. Its browser replacement checks the
actual login, layout, charts, tables, and typography routes.


### Published demo

`docs/` contains the verified production build with relative asset URLs. Refresh its generated assets from `build/` after `npm run build`, preserving deployment metadata. `PLAYWRIGHT_DOCS=1 npm test` serves that directory under `/light-blue-react-template/` and checks its navigation and assets. `node --test tests/service-worker-cleanup.unit.mjs` verifies cache isolation. The retirement service worker removes cached responses only within its app scope and unregisters itself; other apps on the same origin keep their responses.
