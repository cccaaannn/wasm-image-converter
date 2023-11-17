import { Router, Routes, Route } from '@solidjs/router';
import Home from '@/pages/home';

const basePath = process.env.NODE_ENV === "production" ? "/wasm-image-converter" : "/";

function App() {
	return (
		<Router>
			<Routes>
				<Route path={basePath} component={Home} />
			</Routes>
		</Router>
	)
}

export default App;
