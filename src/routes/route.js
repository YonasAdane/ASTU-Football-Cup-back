import express from 'express'
import { getClubsHandler,clubsDetailsHandler,createClubHandler,updateClubHandler,deleteClubHandler} from './club/club.controller.js';
import { createMatchesHandler, deleteMatchesHandler,addCardHandler, getMatchesHandler, matchesDetailsHandler, addGoalMatchesHandler, updateMatchesHandler } from './matches/matches.controller.js';
import { createScheduleHandler, deleteScheduleHandler, getScheduleHandler, ScheduleDetailsHandler, updateScheduleHandler } from './schedule/schedule.controller.js';
import { createPlayerHandler, deletePlayerHandler, getPlayerHandler, playerDetailsHandler, updatePlayerHandler } from './player/player.controller.js';
import { loginHandler, logoutHandler, registerHandler } from './auth/auth.controller.js';

const app=express.Router();

app.post("/login",loginHandler);
app.post("/register",registerHandler)
app.get("/logout",logoutHandler)

app.get('/clubs',getClubsHandler);
app.get('/clubs/:id',clubsDetailsHandler);
app.post('/clubs',createClubHandler)
app.patch('/clubs/:id',updateClubHandler)
app.delete('/clubs/:id',deleteClubHandler)

app.get('/matches',getMatchesHandler)
app.get('/matches/:id',matchesDetailsHandler)
app.post('/matches',createMatchesHandler)
app.patch('/matches/:id',updateMatchesHandler)
app.post('/matches/:id/addGoals',addGoalMatchesHandler)
app.delete('/matches/:id',deleteMatchesHandler)
app.post('/matches/:id/addCard',addCardHandler)

app.get('/schedules',getScheduleHandler)
app.get('/schedules/:id',ScheduleDetailsHandler)
app.post('/schedules',createScheduleHandler)
app.patch('/schedules/:id',updateScheduleHandler)
app.delete('/schedules/:id',deleteScheduleHandler)

app.get('/player',getPlayerHandler);
app.get('/player/:id',playerDetailsHandler);
app.post('/player',createPlayerHandler)
app.patch('/player/:id',updatePlayerHandler)
app.delete('/player/:id',deletePlayerHandler)

export {app as routes}; 