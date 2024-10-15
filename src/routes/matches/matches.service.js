import Match from "../../models/match.js";
import Player from '../../models/player.js';
import mongoose from 'mongoose';
export async function FindAllMatches(){
    const clubs=await Match.find({});
    return clubs;
}

export async function createMatch(clubOneId, clubTwoId, date) {
  try {
    // Check if both club IDs are valid
    if (!mongoose.Types.ObjectId.isValid(clubOneId) || !mongoose.Types.ObjectId.isValid(clubTwoId)) {
      throw new Error('Invalid club IDs');
    }
    // Ensure that ClubOne and ClubTwo are not the same
    if (clubOneId === clubTwoId) {
      throw new Error('A match cannot be between the same club');
    }

    const match = new Match({
      ClubOne: {
        club: clubOneId,
        score: 0
      },
      ClubTwo: {
        club: clubTwoId,
        score: 0
      },
      date: date,
      status: 'scheduled',  
      goals: [],  
      cards: [],  
      comments: []  
    });

    await match.save();

    // console.log('Match created successfully:', match);
    return match;

  } catch (error) {
    console.error('Error creating match:', error);
  }
}

export async function MatchDetail(MatchId){
    const clubs=await Match.findById(MatchId);
    return clubs;
}

export async function DeleteMatch(MatchId){
    const club=await Match.deleteOne({_id:MatchId});
    return club;
}

export async function UpdateMatch(matchId, updateData) {
  try {
    // Find and update the match with the provided data
    const updatedMatch = await Match.findByIdAndUpdate(
      matchId, 
      { $set: updateData }, 
      { new: true } 
    );

    if (!updatedMatch) {
      console.log("Match not found");
      return null;
    }

    // console.log("Match updated:", updatedMatch);
    return updatedMatch;
  } catch (error) {
    // console.error("Error updating match:", error);
    throw error;
  }
}


export async function addGoal(matchId, clubId, playerId, assistId, time) {
  try {
    let match = await Match.findById(matchId);
    if (!match) {
      throw new Error('Match not found');
    }

    // Add the goal to the match's goals array
    match.goals.push({
      club: clubId,
      player: playerId,
      assist: assistId,
      time
    });

    // Increase the score for the club
    if (match.ClubOne.club.toString() === clubId.toString()) {
      match.ClubOne.score += 1;
    } else if (match.ClubTwo.club.toString() === clubId.toString()) {
      match.ClubTwo.score += 1;
    } else {
      throw new Error('Club not part of this match');
    }
    await Player.findByIdAndUpdate(assistId, { $inc: { assist: 1 } });

    await Player.findByIdAndUpdate(playerId, { $inc: { goals: 1 } });

    await match.save();
    return match;
    // console.log('Goal added successfully');
  } catch (error) {
    console.error('Error adding goal:', error);
  } 
}

export async function removeGoal(matchId, goalId) {
    try {
      // Find the match by its ID
      let match = await Match.findById(matchId);
  
      if (!match) {
        throw new Error('Match not found');
      }
  
      // Find the goal by its ID and remove it from the goals array
      const goal = match.goals.id(goalId);
      if (!goal) {
        throw new Error('Goal not found');
      }
  
      const { club, player } = goal;
  
      // Decrease the score for the club
      if (match.ClubOne.club.toString() === club.toString()) {
        match.ClubOne.score -= 1;
      } else if (match.ClubTwo.club.toString() === club.toString()) {
        match.ClubTwo.score -= 1;
      }
  
      // Decrease the player's goal count
      await Player.findByIdAndUpdate(player, { $inc: { goals: -1 } });
  
      // Remove the goal from the goals array
      goal.remove();
  
      // Save the match with the updated score and goals
      await match.save();
  
      console.log('Goal removed successfully');
    } catch (error) {
      console.error('Error removing goal:', error);
    }
  }
  
export async function addCard(matchId, clubId, playerId, color, time) {
    try {
      let match = await Match.findById(matchId);
      if (!match) {
        throw new Error('Match not found');
      }
  
      match.cards.push({
        club: clubId,
        player: playerId,
        color,
        time
      });
  
      await match.save();
      return match;
      // console.log('Card added successfully');
    } catch (error) {
      console.error('Error adding card:', error);
    }
  }

export async function removeCard(matchId, cardId) {
    try {
      // Find the match by its ID
      let match = await Match.findById(matchId);
  
      if (!match) {
        throw new Error('Match not found');
      }
  
      const card = match.cards.id(cardId);
      if (!card) {
        throw new Error('Card not found');
      }  
      card.remove();
      await match.save();
      return match;
      // console.log('Card removed successfully');
    } catch (error) {
      throw new Error('Error removing card:');
    }
  }