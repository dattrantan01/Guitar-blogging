import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import HomePage from "./Pages/HomePage";
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
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
