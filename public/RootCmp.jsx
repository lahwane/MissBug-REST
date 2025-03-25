// const Router = ReactRouterDOM.HashRouter
const Router = ReactRouterDOM.BrowserRouter
const { Route, Routes, Navigate } = ReactRouterDOM
const { useState } = React

import { AppFooter } from "./cmps/AppFooter.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { Team } from "./cmps/Team.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { Vision } from "./cmps/Vision.jsx"
import { About } from "./pages/About.jsx"
import { CarDetails } from "./pages/CarDetails.jsx"
import { CarEdit } from "./pages/CarEdit.jsx"
import { CarIndex } from "./pages/CarIndex.jsx"
import { Home } from "./pages/Home.jsx"


export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} >
                            <Route path="/about/team" element={<Team />} />
                            <Route path="/about/vision" element={<Vision />} />
                        </Route>
                        <Route path="/car" element={<CarIndex />} />
                        <Route path="/car/:carId" element={<CarDetails />} />
                        <Route path="/car/edit" element={<CarEdit />} />
                        <Route path="/car/edit/:carId" element={<CarEdit />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <AppFooter />
                <UserMsg />
            </section>
        </Router>
    )
} 