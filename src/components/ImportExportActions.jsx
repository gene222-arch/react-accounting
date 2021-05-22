import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'



const ImportExportActions = ({ title = '', showImport = true, showExcelExport = true, showCSVExport = true, handleClickImport, handleClickExportExcel, handleClickExportCSV }) => 
{
    return (
        <>
            <Grid container spacing={1} justify='flex-end'>
                <Grid item xs={12} sm={8} md={8} lg={8}>
                    <Typography variant="h6" color="initial">{ title }</Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Grid container spacing={1}>
                        {
                            showImport && (
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <Button 
                                        variant='contained' 
                                        color='default' 
                                        size='small' 
                                        fullWidth
                                        onClick={ handleClickImport }
                                    >
                                        Import
                                    </Button>
                                </Grid>
                            )
                        }
                        {
                            showExcelExport && (
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <Button 
                                        variant='contained' 
                                        color='default' 
                                        size='small' 
                                        fullWidth
                                        onClick={ handleClickExportExcel }
                                    >
                                        Excel
                                    </Button>
                                </Grid>
                            )
                        }
                        {
                            showCSVExport && (
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <Button 
                                        variant='contained' 
                                        color='default' 
                                        size='small' 
                                        fullWidth
                                        onClick={ handleClickExportCSV }
                                    >
                                        CSV
                                    </Button>
                                </Grid>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ImportExportActions
