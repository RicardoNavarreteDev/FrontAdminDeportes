import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import RegisterView2 from "./views/auth/RegisterView2";
import LandingLayout from "./layouts/LandingLayout";
import HomePageView from "./views/landingApp/HomePageView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<LandingLayout />}> 
                    <Route path="/" element={<HomePageView/>} index/>
                </Route>


                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<LoginView />}/>
                    <Route path="/auth/register" element={<RegisterView2 />}/>
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView />}/>
                    <Route path="/auth/request-code" element={<RequestNewCodeView />}/>
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView />}/>
                    <Route path="/auth/new-password" element={<NewPasswordView />}/>
                </Route>

            </Routes>
        </BrowserRouter>
    );   
}