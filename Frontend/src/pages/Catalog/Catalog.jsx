import s from "./Catalog.module.css"

import React, { useEffect, useState } from 'react';

import CoursesService from "../../API/CoursesService";
import CourseList from "../../components/UI/CourseList/CourseList";
import { useNavigate } from "react-router-dom";


import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


function Catalog() {
    const [courses, setCourses] = useState([])
    const [sortedCourse, setSourtedCourse] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        getAllCourses()
    }, [])

    async function getAllCourses() {
        const response = await CoursesService.getAll()
        setCourses(response)
        setSourtedCourse(response)
    }

    function Search(query) {
        setQuery(query)
        if (query !== '') {
            setSourtedCourse(courses.filter(course => {
                return course.name.toLowerCase().includes(query.toLowerCase())
            }))
        } else {
            setSourtedCourse(courses)
        }
    }

    const router = useNavigate()
    return (
        <div className={s.Catalog}>
            <div className={s.Content}>
                <header className={s.header}>
                    <h1>Каталог курсов</h1>

                    <Stack spacing={2} sx={{ width: 400 }}>

                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={courses.map((course) => course.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Поиск"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                    onChange={e => Search(e.target.value)}
                                />
                            )}
                        />
                    </Stack>

                    <Box sx={{ maxWidth: 400 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Факультет
                            </InputLabel>
                            <NativeSelect
                                defaultValue={10}
                                inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value={10}>Институт прикладных информационных технологий</option>
                                <option value={20}>Институт строительства архитектуры и дизайна</option>
                                <option value={30}>Институт нефти и газа</option>
                                <option value={40}>Институт энергетики</option>
                                <option value={50}>Институт цифровой экономики и технологического предпринимательства</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>

                </header>
                <CourseList router={router} courses={sortedCourse} subscribe={0} />
            </div>
        </div>
    )
}


export default Catalog;