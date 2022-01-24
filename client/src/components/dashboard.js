import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import FullCalendar from '@fullcalendar/react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import Swal from 'sweetalert2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';



export default function Dashboard(props) {
  const [event, setEvent] = React.useState([]);

  const updateEvents = () => {
    fetch("/api/events")
    .then((r) => r.json())
    .then(res => setEvent(res.data))
  }
  React.useEffect((e) => { updateEvents() });
  
  const handleDateClick = (arg) => {
    Swal.fire({
      title: "Please write your query here!",
      input: 'textarea',
      confirmButtonText: 'Submit',
      showCancelButton: true
    }).then((result) => {
      if(result.isConfirmed) {
        if(!result.value) {
          Swal.fire("Oh ho!", "The query can't be blank!", "error");
        } else {
          fetch("/api/events/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"title":result.value, "date":arg.dateStr})
          }).then((res) => res.json())
          .then((data) => {
            Swal.fire("Hurray!", "The query is updated successfully!", "success");
            updateEvents();
          });
        }
      }
    });
  }

  return(
    <AppBar color="inherit" position="static" enableColorOnDark disablegutters="true" sx={{ boxShadow:0 }}>
      <Container maxWidth="xl">
        <Box sx={{ bgcolor:props.color,borderTopRightRadius:15,borderTopLeftRadius:15,paddingBottom:3,minHeight:"100vh" }}> 
          
          <Container maxWidth="xl">
            <Typography variant="h5" noWrap component="h6" sx={{ paddingTop:3,fontWeight:900 }} color="primary.dark">
              Calender
            </Typography>
            <Card sx={{ marginTop:3,padding:2,borderRadius:3 }}>
              <CardContent>

                <FullCalendar
                  plugins={[ dayGridPlugin,listPlugin,interactionPlugin ]}
                  headerToolbar={{
                    left: "prev,today,next",
                    center: "title",
                    right: "dayGridMonth,listMonth"
                  }}
                  initialView="dayGridMonth"
                  selectable={ true }
                  selectMirror={ true }
                  events={ event }
                  select={ handleDateClick }
                  buttonText={{"month":"Month", "list":"Agenda"}}
                  dateClick={ handleDateClick }
                />

              </CardContent>

            </Card>
          </Container>

        </Box>
      </Container>
    </AppBar>
  );
}