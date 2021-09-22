import { Route } from "react-router";
import { Applications } from "./applications/Application";
import { AuthProvider } from "./auth/AuthProvider";
import { ChurchProfile } from "./churchprofile/ChurchProfile";
import { ChurchProfileEdit } from "./churchprofile/ChurchProfilEdit";
import { EditJobPosting } from "./jobBoard/EditJob";
import { JobApplicationForm } from "./jobBoard/JobApplication";
import { JobBoard } from "./jobBoard/JobBoard";
import { JobBoardProvider } from "./jobBoard/JobBoardProvider";
import { JobForm } from "./jobBoard/JobForm";
import { EditComment } from "./postwall/EditComment";
import { EditPost } from "./postwall/EditPost";
import { NewPostForm } from "./postwall/NewPost";
import { SelectedPost } from "./postwall/PostSelected";
import { PostWall } from "./postwall/PostWall";
import { PostWallProvider } from "./postwall/PostWallProvider";
import { EditApplication } from "./user/UserApplicationEdit";
import { Profile } from "./user/UserProfile";
import { UserProfileEdit } from "./user/UserProfileEdit";
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
                        <Route path ="/editchurchprofile/:churchId(\d+)">
                            <ChurchProfileEdit />
                        </Route>
                        <Route path ="/edituserprofile/:userId(\d+)">
                            <UserProfileEdit />
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
                            <Route path="/newpost">
                                <NewPostForm />
                            </Route>
                            <Route path="/editpost/:postId(\d+)">
                                <EditPost />
                            </Route>
                            <Route path="/editcomment/:commentId(\d+)">
                                <EditComment />
                            </Route>
                        </PostWallProvider>
                    </UserProvider>
                </AuthProvider>
            </JobBoardProvider>
        </>
    )
}