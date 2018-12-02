var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","component":"LandingComponent"},{"path":"profile","loadChildren":"app/user-profile/user-profile.module#UserProfileModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/user-profile/user-profile-routing.module.ts","module":"UserProfileRoutingModule","children":[{"path":"edit","component":"EditProfileComponent"},{"path":"contact-info","component":"ContactInfoComponent"},{"path":"","component":"ProfileComponent"}],"kind":"module"}],"module":"UserProfileModule"}]}],"kind":"module"},{"name":"routes","filename":"src/app/auth/auth-routing.module.ts","module":"AuthRoutingModule","children":[{"path":"login","component":"LogInComponent"},{"path":"login/:type","component":"LogInComponent"},{"path":"sign-up","component":"SignUpComponent"},{"path":"forgot-password","component":"ForgotPasswordComponent"},{"path":"reset-password/:token","component":"ResetPasswordComponent"}],"kind":"module"}]}