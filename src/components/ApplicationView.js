import { Route } from "react-router";
import { Applications } from "./applications/Application";
import { AuthProvider } from "./auth/AuthProvider";
import { ChurchProfile } from "./churchprofile/ChurchProfile";
import { EditJobPosting } from "./jobBoard/EditJob";
import { JobApplicationForm } from "./jobBoard/JobApplication";
import { JobBoard } from "./jobBoard/JobBoard";
import { JobBoardProvider } from "./jobBoard/JobBoardProvider";
import { JobForm } from "./jobBoard/JobForm";
import { SelectedPost } from "./postwall/PostSelected";
import { PostWall } from "./postwall/PostWall";
import { PostWallProvider } from "./postwall/PostWallProvider";
import { EditApplication } from "./user/UserApplicationEdit";
import { Profile } from "./user/UserProfile";
import { UserProvider } from "./user/UserProvider";

export const ApplicationViews = () =>{
    return (
        <>
            <JobBoardProvider>
                <AuthProvider>
                    <UserProvider>
                        <Route exact path ="/jobpostings">
                            <JobBoard />
                        </Route>
                        <Route exact path ="/jobpostings/edit/:jobId(\d+)">
                            <EditJobPosting />
                        </Route>
                        <Route exact path ="/applications/:jobId(\d+)">
                            <Applications />
                        </Route>
                        <Route path="/applications/edit/:applicationId(\d+)">
                            <EditApplication />
                        </Route>
                        <Route exact path="/churchprofile/:churchId(\d+)">
                            <ChurchProfile/>
                        </Route>
                        <Route exact path ="/profile/:userId(\d+)">
                            <Profile />
                        </Route>
                        <Route path ="/profile/editprofile/:userId(\d+)">

                        </Route>
                        <Route path ="/profile/editApplication/:applicationId(\d+)">

                        </Route>
                        <Route  path ="/jobpostings/post">
                            <JobForm />
                        </Route>
                        <Route  path ="/jobpostings/apply/:jobId(\d+)">
                            <JobApplicationForm />
                        </Route>
                        <PostWallProvider>
                            <Route path = "/post/:postId(\d+)">
                                <SelectedPost />
                            </Route>
                            <Route exact path="/">
                                <PostWall/>
                            </Route>
                        </PostWallProvider>
                    </UserProvider>
                </AuthProvider>
            </JobBoardProvider>
        </>
    )
}