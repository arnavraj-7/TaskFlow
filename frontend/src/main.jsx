import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import Done from "./assets/Components/Done.jsx";
import NotDone from "./assets/Components/NotDone.jsx";
import AllToDo from "./assets/Components/AllToDo.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/clerk-react";
import LoginPage from "./assets/Components/LoginPage.jsx";
import SignUpPage from "./assets/Components/SignUpPage.jsx";
import Footer from "./assets/Components/Footer.jsx";
import LandingPage from "./assets/Components/LandingPage.jsx";
import { Layout } from "lucide-react";
import AppWrapper from "./assets/Components/AppWrapper.jsx";
import LoadingScreen from "./assets/Components/LoadingScreen.jsx";
import { Toaster } from "sonner";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      {/* TaskFlow is a separate section with nested routes */}
      <Route
        path="taskflow"
        element={
          <>
            <ClerkLoading>
              <LoadingScreen />
            </ClerkLoading>
            <SignedIn>
                <AppWrapper />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
            
          </>
        }
      >
        <Route index element={<AllToDo />} />
        <Route path="done" element={<Done />} />
        <Route path="notdone" element={<NotDone />} />
      </Route>
    </>
  )
);
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      <Toaster position="top-right"/>
    </ClerkProvider>
  </StrictMode>
);
