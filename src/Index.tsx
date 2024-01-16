import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {createTheme, Switch, ThemeProvider} from "@mui/material";
import DepartmentList from "./Pages/DepartmentList.tsx";
import UserList from "./Pages/UserList.tsx";
import Login from './Pages/Login.tsx';

export default function Index() {

	const [isLogin, setIsLogin] = useState(2);
	const [switchOn, setSwitchOn] = useState(false);

	// This will check if user's logged in or not
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const name = localStorage.getItem('name') || "";
			const email = localStorage.getItem('email') || "";
			const phoneNumber = localStorage.getItem('phoneNumber') || "";

			if (name !== "" && email !== "" && phoneNumber != "") {
				setIsLogin(1)
			}else{
				setIsLogin(0)
			}
		}
	}, []);


	// This is custom theme for switch button
	const theme = createTheme({
		components: {
			MuiSwitch: {
				styleOverrides: {
					switchBase: {
						// Controls default (unchecked) color for the thumb
						color: "#8888ee"
					},
					colorPrimary: {
						"&.Mui-checked": {
							// Controls checked color for the thumb
							color: "#8888ee"
						}
					},
					track: {
						// Controls default (unchecked) color for the track
						opacity: 0.7,
						backgroundColor: "#ffff",
						".Mui-checked.Mui-checked + &": {
							// Controls checked color for the track
							opacity: 0.7,
							backgroundColor: "#ffff"
						}
					}
				}
			}
		}
	});


	return (

		/* This box perform three actions
		 * 	1. If User is not logged in then show login form
		 * 	2. If User is logged in then show Content
		 * 	3. If windows is not define then show nothing
		 */

		<Box>
			{
				// Case if user is not logged in
				isLogin === 0 && <Login/>
			}
			{
				// Case if user is logged in
				isLogin === 1 && <Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 4}}>
                        <ThemeProvider theme={theme}>
                            Users
                            <Switch
                                onChange={() => {
									setSwitchOn(!switchOn)
								}}
                            />
                            Departments
                        </ThemeProvider>
                    </Box>

                    <Box>
						{
							switchOn ? <DepartmentList/> : <UserList/>
						}
                    </Box>
                </Box>
			}
		</Box>
	);
}