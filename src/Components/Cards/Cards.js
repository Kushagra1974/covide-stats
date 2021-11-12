import dateFormat from "dateformat";

import { Card } from "@mui/material"
import { CardContent } from "@mui/material"
import { Typography } from "@mui/material"
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { StateContext } from "../../stateProvider/StateProvider";
import CountUp from 'react-countup';

import { useState, useEffect, useContext } from 'react';

const useStyles = makeStyles({
    left: {
        textAlign: "left"
    },
    confirmed: {
        borderBottom: "10px solid rgba(0,0,255,0.5)",
        padding: "0 !important"
    },
    recovered: {
        borderBottom: "10px solid rgba(0,255,0,0.5)",
        padding: "0 !important"
    },
    deaths: {
        borderBottom: "10px solid rgba(255,0,0,0.5)",
        padding: "0 !important"
    }
})


export default function Cards() {

    const { state, setState } = useContext(StateContext);
    const [data, setData] = useState({ lastUpdate: "2021-10-15T06:21:22.000Z" });
    useEffect(() => {
        async function fetchData() {
            try {
                let res = await fetch("https://covid19.mathdro.id/api");
                if (state !== "") {
                    res = await fetch(`https://covid19.mathdro.id/api/countries/${state}`)
                }

                const dt = await res.json();
                const { confirmed, recovered, deaths, lastUpdate } = dt;
                const obj = {
                    confirmed: confirmed.value,
                    recovered: recovered.value,
                    deaths: deaths.value,
                    lastUpdate
                }
                setData(obj);
            }
            catch (e) {
                console.error("Error : ", e)
            }
        }
        fetchData();
    }, [state])


    const classes = useStyles();
    //console.log(data);
    if (!data.confirmed) {
        return "Loding...";
    }
    return <div>
        <Grid container spacing={4} justifyContent="center" className={classes.left}>
            <Grid item sm={8} md={3}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom color="textSecondary">Infected</Typography>
                        <Typography variant="h4">
                            <CountUp start={0} end={data.confirmed} duration={2.5} />
                        </Typography>
                        <Typography color="textSecondary">{dateFormat(new Date(data.lastUpdate), "dddd, mmmm dS, yyyy")}</Typography>
                        < Typography> Number of active cases of COVID - 19</Typography>
                    </CardContent>
                    <CardContent className={classes["confirmed"]} />
                </Card>
            </Grid>
            <Grid item sm={8} md={3}>
                <Card >
                    <CardContent>
                        <Typography gutterBottom color="textSecondary" >Recovered</Typography>
                        <Typography variant="h4" >
                            <CountUp start={0} end={data.recovered} duration={2.5} />
                        </Typography>
                        <Typography color="textSecondary">{dateFormat(new Date(data.lastUpdate), "dddd, mmmm dS, yyyy")}</Typography>
                        < Typography  > Number of active cases of COVID - 19</Typography>
                    </CardContent>
                    <CardContent className={classes["recovered"]} />
                </Card>
            </Grid>
            <Grid item sm={8} md={3}>
                <Card >
                    <CardContent>
                        <Typography gutterBottom color="textSecondary" >Deaths</Typography>
                        <Typography variant="h4">
                            <CountUp start={0} end={data.deaths} duration={2.5} />
                        </Typography>
                        <Typography color="textSecondary">{dateFormat(new Date(data.lastUpdate), "dddd, mmmm dS, yyyy")}</Typography>
                        < Typography  > Number of active cases of COVID - 19</Typography>
                    </CardContent>
                    <CardContent className={classes["deaths"]} />
                </Card>
            </Grid>
        </Grid>
    </div>
}