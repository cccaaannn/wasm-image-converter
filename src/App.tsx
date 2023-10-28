import { Router, Routes, Route } from '@solidjs/router';
import Home from '@/pages/home';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" component={Home} />
			</Routes>
		</Router>
	)
}

export default App;
