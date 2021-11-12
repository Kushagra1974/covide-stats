import { makeStyles } from "@mui/styles"

import { Select, FormControl, MenuItem, Typography } from "@mui/material";

import { useState, useEffect, useContext } from "react";

import { StateContext } from "../../stateProvider/StateProvider";


const useStyle = makeStyles({
    country: {
        margin: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    p: {
        marginRight: "20px !important"
    }
})

export default function CountryPicker(params) {

    const [country, setCountry] = useState([{ name: "none" }]);
    const { state, setState } = useContext(StateContext);
    useEffect(() => {

        async function fetchData() {
            try {
                const res = await fetch("https://covid19.mathdro.id/api/countries")
                const data = await res.json(res);
                setCountry(data.countries)
            }
            catch (e) {
                console.error(e);
            }
        }

        fetchData();
    }, [])

    //console.log(country, "help");
    const classes = useStyle();

    const [clicked, setclicked] = useState("none");

    const changeHandler = (e) => {
        //console.log(e.target.value);
        const val = e.target.value;
        setclicked(val);
        setState(val);
    }

    return (
        <div className={classes.country}>
            <Typography variant="h6" className={classes.p}>Country : </Typography>
            <FormControl className={classes.justify} sx={{ minWidth: 120 }}>
                <Select
                    value={clicked}
                    onChange={changeHandler}
                >
                    {<MenuItem value={"none"}>None</MenuItem>}
                    {country.map((data) => {
                        return <MenuItem value={data.name}>{data.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    )
}