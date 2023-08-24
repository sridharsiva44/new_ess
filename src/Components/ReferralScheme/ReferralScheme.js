import React from 'react'
import Grid from '@mui/material/Grid';
import {  Card, CardContent, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

function ReferralScheme() {
    return (
        <Grid container component="main" spacing={2} justifyContent="flex-start" alignItems="stretch">
            <Grid item xs={12} sm={6} md={12}>

                <Card sx={{ Width:'100%',backgroundColor:"#cce0ff"}}>

                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div"
                            sx={{
                                
                             
                                
                            }}
                          >
                          <b>Ambassador Program-Employee Referral Scheme</b>
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div"
                            // sx={{
                            //     textAlign: 'center',
                            //     fontSize: '20px',
                            //     fontWeight: '20px'
                            >
                           We are sure that all of us are proud being a member of Changepond.We believe there is no better way of attracting applicants than being an Ambassador of Changepond
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div"
                            // sx={{
                            //     textAlign: 'center'
                             //}}
                             >
                           Recommend our organization to a <b>friend ,ex-colleague,acquaintance or anybody who you feel is qualified and eligible </b> for position in Changepond.Talk proudly about Changepond,
                           tell people,what a great place it is to work-Become a Brand "Ambassador".Being an Ambassador will not only increase our Organization's Brand Value but will also benefit your personally 
                        </Typography>
        
                    </CardContent>

                </Card>
            </Grid>
            <Grid item xs={12} sm={6}  md={6}>
                <Card sx={{Width:'50%',height:'100%' }}>

                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div"
                            // sx={{
                            //     color: 'white',
                            //     backgroundColor: 'blue',
                            //     textAlign: 'center'
                            // }}
                            >
                           How does the porogram works? 
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div" >
                           You can submit the relevent Resumes of friends and relatives  to HR Department at <a href=''>EmployeeReferral@changepond.com</a>  however,the Resume has already been recieved through another sources, the first received application will be considered.
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div">
                            
                         Please make sure an acknowledgement is made by HR confirming the Category towards eligiblity for the Ambassador Program
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div">
                            The  referred candidate will be expected to go through all the regular procedures in recruitment followed at Changepond
                        </Typography>
                    </CardContent>

                </Card>
            </Grid> 
             <Grid item xs={12} sm={6}  md={6}>
                <Card sx={{ Width:'50%',height:'100%' }}>

                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                           Eligiblity
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div">
                          An employee can submit any number of referrals under the program. All such referrals should be clearly marked for submission under the Ambassador program so as
                          to qualify for the award. However, the award will not apply in the following cases of recommendation 
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div">
                           <li>Fresh graduates(with less than one year exprience)</li>
                           <li>Past employees of the company</li>
                           <li>Employees of our Clients with whom we are working positions. Which are not specifically covered by this program</li>
                        </Typography>
                        
                    </CardContent>

                </Card>
            </Grid> 
             <Grid item xs={12} sm={6}  md={6}>
                <Card sx={{Width:'50%',height:'100%'}}>

                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                           What is that you earn?
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div">
                            If the candidate  referred by you gets selected for a permanent position. you shall be paid 
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div">
                        <li>Category|:<b>Rs. 15,000/-</b><b>2-6 years</b>of experience</li>
                        <li>Category||:<b>Rs. 25,000/-</b><b>6+ years</b>of experience</li>
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div">
                            The term experience means, the candidate's relevent experience and skill set 
                            requirement as per the projects needs 
                        </Typography>
                    </CardContent>

                </Card>
            </Grid> 



            <Grid item xs={12} sm={6}  md={6}>

                <Card sx={{Width:'50%',height:'100%'}}>

                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                         How is the reward disbursed?
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div">
                          The reward shall be paid only upon competition of Three months of the referred employee.
                          The reward will be payable only if both you and the referred employee are in service with 
                          Changepond.For the purpose of calculation of disbursement amount,any employee <b>joining before 15th of a month</b>
                          shall be considered to have joined on 1st of that month.Similarly, an employee <b>joining after 15th of a month</b>
                          shall be considered to have joined on 1st of next month.
                        </Typography>
                        
                    </CardContent>

                </Card>
            </Grid>
           
</Grid>


    )
}

export default ReferralScheme
