import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AllMessages from "./AllMessages";
import ImportantMessages from "./ImportantMessages";
import SendMessage from "./SendMessage";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Chat = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(parseInt(localStorage.getItem("tabChat")));

    const handleChange = (event, newValue) => {
        setValue(newValue);
        localStorage.setItem("tabChat", newValue)
    };

    return (
        <div className='chat'>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label={parseInt(localStorage.getItem("language")) === 0 ? "All Messages" : "Toate mesajele"} {...a11yProps(0)} />
                        <Tab label={parseInt(localStorage.getItem("language")) === 0 ? "Important Messages" : "Mesajele importante"} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <AllMessages/>
                    <SendMessage/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ImportantMessages/>
                </TabPanel>
            </div>
        </div>
    );
}

export default Chat
