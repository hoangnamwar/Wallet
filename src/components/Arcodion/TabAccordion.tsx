import React from 'react';
// import Accordion from '@mui/material/Accordion';
// import {Accordion} from '@mui/material';

import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Button } from '@material-ui/core';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Link, useLocation } from 'react-router-dom';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));



const TabAccordion = () => {

  // const [expanded, setExpanded] = useState<string | false>(false);
  const [expanded, setExpanded] = useState<string | false>('panel1');

  let x = useLocation();
  let location = x.pathname;
  location = location.slice(1);
  if(location === "")
    location = "home";
  // console.log(location);
  // const [click, setClick] = useState<"home" | "money_in" | "money_out" | "history">(location);
  const [click, setClick] = useState<string>(location);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));


  return (
    <>

      <div className="tabAccordion2">
        <Link to="/" className="tabAccodion_under">
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
            className={`${(click === "home") ? "tabAccodion-click" : ""}`}
            onClick={() => {
              setClick("home");

            }}
          >
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>
                Home
              </Typography>
            </AccordionSummary>
          </Accordion>
        </Link>
        <Link to="/money-in" className="tabAccodion_under">
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
            className={`${(click === "money-in") ? "tabAccodion-click" : ""}`}
            onClick={() => setClick("money-in")}
          >
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Typography>Khoản thu</Typography>
            </AccordionSummary>
            {/* <AccordionDetails className="tabAccodion-flex-btn">
              <a href="co_dinh">
                <Button>Cố định</Button>
              </a>
              <a href="tuong_lai">
                <Button>Tương lai</Button>
              </a>
              <a href="hien_tai">
                <Button>Hiện tại</Button>
              </a>
            </AccordionDetails> */}
          </Accordion>
        </Link>
        <Link to="/money-out" className="tabAccodion_under">
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
            className={`${(click === "money-out") ? "tabAccodion-click" : ""}`}
            onClick={() => setClick("money-out")}
          >
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <Typography>Khoản chi</Typography>
            </AccordionSummary>
            {/* <AccordionDetails className="tabAccodion-flex-btn">
              <Button>Cố định</Button>
              <Button>Tương lai</Button>
              <Button>Hiện tại</Button>
            </AccordionDetails> */}
          </Accordion>
        </Link>
        <Link to="/history" className="tabAccodion_under">
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
            className={`${(click === "history") ? "tabAccodion-click" : ""}`}
            onClick={() => setClick("history")}
          >
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <Typography>Lịch sử</Typography>
            </AccordionSummary>
          </Accordion>
        </Link>
      </div>
    </>
  )
}

export default TabAccordion
