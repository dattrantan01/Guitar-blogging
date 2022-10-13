import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/dashboard/DashBoardLayout";
import PostAddNew from "./components/post/PostAddNew";
import PostManage from "./components/post/PostManage";
import { AuthProvider } from "./contexts/auth-context";
import DashboardPage from "./Pages/DashboardPage";
import HomePage from "./Pages/HomePage";
import PostDetailsPage from "./Pages/PostDetailPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";

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
            path="/:slug"
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
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
