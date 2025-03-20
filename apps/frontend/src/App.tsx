import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/home/Hero";
import { Features } from "./components/home/Features";
import { LoginForm } from "./components/auth/LoginForm";
import { Dashboard } from "./components/dashboard/Dashboard";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { RegisterForm } from "./components/auth/RegisterForm";

function App() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<Router>
					<Routes>
						<Route
							path="/"
							element={
								<div className="min-h-screen bg-white dark:bg-gray-900">
									<Header />
									<main>
										<Hero />
										<Features />
									</main>
								</div>
							}
						/>
						<Route path="/login" element={<LoginForm />} />
						<Route path="/register" element={<RegisterForm />} />
						<Route
							path="/dashboard"
							element={
								<PrivateRoute>
									<Dashboard />
								</PrivateRoute>
							}
						/>
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</Router>
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
