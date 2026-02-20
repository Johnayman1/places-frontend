import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { Suspense } from "react";
import LoadingSpinner from "./shared/components/UIElments/Spinner/LoadingSpinner";

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <>
        <Route path="/" element={<Users />} lazy={true} />
        <Route path="/:userid/places" element={<UserPlaces />} lazy={true} />
        <Route path="/places/new" element={<NewPlace />} lazy={true} />
        <Route path="/places/:placeid" element={<UpdatePlace />} lazy={true} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Users />} lazy={true} />
        <Route path="/:userid/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} lazy={true} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Suspense fallback={<div className="center">
            <LoadingSpinner/>
          </div>}>
            <Routes>{routes}</Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
