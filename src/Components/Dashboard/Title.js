import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

function Title(props) {
    return (
        <Typography component="h6" variant="h6"
        sx={{ fontSize: '16px', fontWeight: '600', color: "#34383F", margin: "-16px -16px 6px", padding: "10px 16px", borderBottom: "1px solid #E7EFFF" }}
        >
            {props.children}
        </Typography>
    );
}

Title.propTypes = {
    children: PropTypes.node,
};

export default Title;