import {DataGrid, GridColDef} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import {Card} from "@mui/material";

export default function UserList() {


	// Interface for fetched data
	interface Post {
		id: number;
		title: string;
		body: string;
		userId: number;
	}

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: 'ID',
			flex:0.3,
		},
		{
			field: 'userId',
			headerName: 'User ID',
			flex:0.3,
		},
		{
			field: 'title',
			headerName: 'Title',
			flex:1,
		},
		{
			field: 'body',
			headerName: 'Body',
			flex:1,
		},
	];

	const [rows, setRows] = useState<Post[]>([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((response) => response.json())
			.then((data) => {
				setRows(data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);

	return (
		<Card sx={{height: "100%", width: '100%', minWidth: 500 }}>
			{rows.length != 0 && (
				<DataGrid
					sx={{p:1,height:"90vh"}}
					getRowHeight={() => 'auto'}
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10,
							},
						},
					}}
					pageSizeOptions={[10]}
				/>
			)}
		</Card>
	);
}
