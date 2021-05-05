import React, { Component } from "react";
import * as element from "@material-ui/core";
import { Link } from "react-router-dom";


export default class CreateRoomPage extends Component {
  defaultVotes = 1;

  constructor(props) {
    super(props);
    this.state ={
      guest_can_pause: true,
      votes_to_skip: this.defaultVotes,
    };

    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);

  }

  handleVotesChange = e => {
    this.setState({
      votes_to_skip: e.target.value,
    });

  };

  handleGuestCanPauseChange = e => {
    this.setState({
      guest_can_pause: e.target.value === "true" ? true : false,
    });

  };

  handleRoomButtonPressed = () =>{
   const submitOptions = {
     method: 'POST',
     headers: { 'Content-Type': 'application/json'},
     body :JSON.stringify({
      votes_to_skip: this.state.votes_to_skip,
      guest_can_pause: this.state.guest_can_pause
     }),
    };

    fetch("/api/create-room/", submitOptions)
    .then((response) => response.json())
    .then((data) => this.props.history.push('/room/' + data.code));
}

  render() {
    return (
      //Header
      <element.Grid container spacing={1}>
        <element.Grid item xs={12} align ="center">
          <element.Typography component="h4" variant="h4">
            Create A Room
          </element.Typography>
        </element.Grid>

        {/* Radio Buttons Grid*/}
       <element.Grid item xs={12} align  ="center">
          <element.FormControl component="fieldset">
            <element.FormHelperText>
                Guest Control of Playback State
            </element.FormHelperText>
            <element.RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
              <element.FormControlLabel 
                value="true"
                control={<element.Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom" />

              <element.FormControlLabel 
                value="false"
                control={<element.Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom" />
            </element.RadioGroup>
          </element.FormControl>
        </element.Grid>

         {/*Input Field*/}
        <element.Grid item xs={12} align  ="center">
          <element.FormControl>
            <element.TextField 
              required={true} 
              type="number" 
              onChange = {this.handleVotesChange}
              defaultValue={this.defaultVotes}
              inputProps={{
                min: 1,
                style: {textAlign: "center"},
              }}/>
            <element.FormHelperText>
                Votes Required To Skip Song
            </element.FormHelperText>
          </element.FormControl>
        </element.Grid>

         {/*Links*/}
        <element.Grid item xs={12} align  ="center">
            <element.Button color="primary" variant="contained" onClick={this.handleRoomButtonPressed}>
              Create a Room
            </element.Button>
        </element.Grid>
        <element.Grid item xs={12} align  ="center">
            <element.Button color="secondary" variant="contained" to="/" component={Link}>
              Back
            </element.Button>
        </element.Grid>
      </element.Grid>
    );
  }
}