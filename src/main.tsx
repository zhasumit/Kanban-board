import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.tsx";
import KanbanBoard from "./components/KanbanBoard.tsx";
import About from "./components/About.tsx";
import Unknown from "./components/Unknown";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route path="" element={<KanbanBoard />}></Route>
			<Route path="about" element={<About />}></Route>
			<Route path="/:unknown" element={<Unknown />}></Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
