import React from "react";
import { Route, Routes } from 'react-router-dom';
import Login from "../../pages/Login/Login";
import Main from "../../pages/Main/Main";
import { publicRoutes, privateRoutes, teacherRoutes, studentRoutes } from "../../router";

function AppRouter({ user }) {
    // const isAuth = true

    return (
        user.isAuth ?
            user.group === "Teacher" ?
                <Routes>
                    {teacherRoutes.map((route, id) =>
                        <Route
                            key={id}
                            element={route.element}
                            path={route.path}
                        />
                    )}

                    <Route
                        path="*"
                        element={<Main />}
                    />
                </Routes>
                :
                <Routes>
                    {studentRoutes.map((route, id) =>
                        <Route
                            key={id}
                            element={route.element}
                            path={route.path}
                        />
                    )}

                    <Route
                        path="*"
                        element={<Main />}
                    />
                </Routes>
            :
            <Routes>
                {publicRoutes.map((route, id) =>
                    <Route
                        key={id}
                        element={route.element}
                        path={route.path}
                    />
                )}

                <Route
                    path="*"
                    element={<Login />}
                />

            </Routes>

    )
}

export default AppRouter;