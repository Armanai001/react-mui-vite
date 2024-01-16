import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Accordion, AccordionDetails, AccordionSummary, Card} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";
import {SyntheticEvent, useState} from "react";

export default function DepartmentList() {
    const departments = [
        {
            "department": "customer_service",
            "sub_departments": [
                "support",
                "customer_success"
            ]
        },
        {
            "department": "design",
            "sub_departments": [
                "graphic_design",
                "product_design",
                "web_design"
            ]
        }
    ];

    // Creating an object of {department:[sub_departments]}
    interface DepartmentSelect {
        [key: string]: string[];
    }

    const departmentObject: DepartmentSelect = {};

    departments.forEach(department => {
        departmentObject[department.department] = [];
    });


    const [expanded, setExpanded] = useState<number | false>(false);
    const [selected, setSelected] = useState(departmentObject);

    const handleAccordionChange = (panel: number) => (
        _event: SyntheticEvent,
        isExpanded: boolean
    ) => {
        setExpanded(isExpanded ? panel : false);
    };


    // Code for subDepartment adding or removing in object array
    const handleSubDepartments = (department: string, subDepartment: string) => {
        setSelected((prevSelected) => {
            const isSubDepartmentSelected = prevSelected[department].includes(subDepartment);

            if (isSubDepartmentSelected) {
                return {
                    ...prevSelected,
                    [department]: prevSelected[department].filter((item) => item !== subDepartment),
                };


            } else {
                return {
                    ...prevSelected,
                    [department]: [...prevSelected[department], subDepartment],
                };

            }
        });
    };


    // Code for setting Department's array full or empty
    const handleDepartments = (department: string, subDepartment: string[]) => {
        setSelected((prevSelected) => {
            const isSubDepartmentSelected = (prevSelected[department].length === subDepartment.length)

            if (isSubDepartmentSelected) {
                return {
                    ...prevSelected,
                    [department]: [],
                };
            } else {
                return {
                    ...prevSelected,
                    [department]: subDepartment,
                };
            }
        });
    };

    const show = () => {
        const nonEmptyDepartments = Object.keys(selected).filter(department => selected[department].length > 0);

        const nonEmptyObject: Record<string, string[]> = {};
        nonEmptyDepartments.forEach(department => {
            nonEmptyObject[department] = selected[department];
        });

        if (Object.keys(nonEmptyDepartments).length === 0) {
            console.log("Please choose something");
        } else {
            console.log(nonEmptyObject)
        }
    };


    return (
        <Box sx={{p: 3, mx: 1}}>
            <Box sx={{width: "100%", display: 'flex', justifyContent: 'end',alignItems:"center"}}>
                You will get output in console
                <Button onClick={show} sx={{ml:5}}>
                    show data
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 300,
                    overflowX: 'auto',
                }}
            >
                <Card sx={{mb: 5, mt: 2, width: '100%'}}>
                    {departments.map((department, departmentIndex) => (
                        <Accordion
                            key={department.department}
                            expanded={expanded === departmentIndex}
                            onChange={handleAccordionChange(departmentIndex)}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                            >
                                <FormControlLabel
                                    label={department.department}
                                    control={
                                        <Checkbox
                                            checked={selected[department.department].length === department.sub_departments.length}
                                            indeterminate={selected[department.department].length > 0 && selected[department.department].length < department.sub_departments.length}
                                            onClick={() => {
                                                handleDepartments(department.department, department.sub_departments)
                                            }}
                                        />
                                    }
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                                    {department.sub_departments.map(sub_department => (
                                        <FormControlLabel
                                            key={sub_department}
                                            label={sub_department}
                                            control={
                                                <Checkbox
                                                    checked={selected[department.department].includes(sub_department)}
                                                    onClick={() => {
                                                        handleSubDepartments(department.department, sub_department)

                                                    }}
                                                />
                                            }
                                        />
                                    ))}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Card>
            </Box>
        </Box>
    );
}
