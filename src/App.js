import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/dashboard/DashBoardLayout";
import PostAddNew from "./module/post/PostAddNew";
import PostManage from "./module/post/PostManage";
import { AuthProvider } from "./contexts/auth-context";
import DashboardPage from "./Pages/DashboardPage";
import HomePage from "./Pages/HomePage";
import PostDetailsPage from "./Pages/PostDetailPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import CategoryAddNew from "./module/category/CategoryAddNew";
import CategoryManage from "./module/category/CategoryManage";
import CategoryUpdate from "./module/category/CategoryUpdate";
import UserProfile from "./module/user/UserProfile";
import UserManage from "./module/user/UserManage";
import UserUpdate from "./module/user/UserUpdate";
import PostUpdate from "./module/post/PostUpdate";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/blog" element={<div>blog</div>}></Route>
          <Route
            path="/:id"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/update-post"
              element={<PostUpdate></PostUpdate>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/update-category"
              element={<CategoryUpdate></CategoryUpdate>}
            ></Route>
            <Route
              path="/manage/user-profile"
              element={<UserProfile></UserProfile>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/update-user"
              element={<UserUpdate></UserUpdate>}
            ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
