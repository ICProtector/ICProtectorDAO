import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Option "mo:base/Option";
import Blob "mo:base/Blob";
import Bool "mo:base/Bool";
import Map "mo:base/HashMap";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";

actor ProposalManager {
  // Define the types for the system
  type Proposal = {
    id : Text;
    creator : Principal;
    topicName : Text;
    description : Text;
    image : Text;
    creationTime : Int;
    endTime : Int;
    status : Bool;
    twoOptionType : Bool;
    twoOptionOptions : OptionTwoStatus;
    options : Option;
  };
  type Option = {
    op1 : Text;
    count1 : Int;
    op2 : Text;
    count2 : Int;
    op3 : Text;
    count3 : Int;
    op4 : Text;
    count4 : Int;
    op5 : Text;
    count5 : Int;
  };

  type Vote = {
    voter : Principal;
    proposalId : Text;
    vote : Text;
    voteTime : Int;
  };

  type OptionTwoStatus = {
    yesVotes : Nat;
    noVotes : Nat;
  };

  // type Reward = {
  //   receiver : Principal;
  //   amount : Nat;
  //   proposalId : Text;
  // };

  // Stable storage to persist data across upgrades
  private stable var mapEntries : [(Text, Proposal)] = [];
  var map = Map.HashMap<Text, Proposal>(0, Text.equal, Text.hash);

  private stable var ownerEntries : [(Principal, Vote)] = [];
  var owners = Map.HashMap<Principal, Vote>(0, Principal.equal, Principal.hash);

  // private stable var proposals : [Proposal] = [];
  // private stable var votes : [Vote] = [];
  // private stable var rewards : [Reward] = [];

  // // Create a new proposal
  public shared (msg) func createProposal(id : Text, topicName1 : Text, description1 : Text, arImage : Text, argStartdate : Int, argEndDate : Int, twoOptionType : Bool, argoptions : Option) : async Proposal {
    let currentTime = Time.now();
    // let proposalId = proposals.size() + 1; // Naive auto-increment, should be improved
    let owner = msg.caller;
    let newProposal : Proposal = {
      id = id;
      creator = owner; // Getting the caller's Principal
      topicName = topicName1;
      description = description1;
      image = arImage;
      creationTime = currentTime;
      endTime = argEndDate;
      status = true;
      twoOptionType = false;
      twoOptionOptions = {
        yesVotes = 0;
        noVotes = 0;
      };
      options = argoptions;
    };
    map.put(id, newProposal);
    return newProposal;
  };
  // public query func getProposal(proposalId : Text) : async ?Proposal {
  //   switch (map.get(proposalId)) {
  //     case (null) {
  //       return null;
  //     };
  //     case (?proposal) {

  //       return proposal;
  //     };
  //   };
  // };
  public query func getProposal(id : Text) : async ?Proposal {
    return map.get(id);
  };
  // Method to cast a vote
  public shared (msg) func castVote(proposalId : Text, selectedOption : Text) : async Text {
    switch (map.get(proposalId)) {
      case (null) {
        return "No id";
      };
      case (?proposal) {
        let currentTime = Time.now();
        // if (not proposal.status or currentTime >= proposal.endTime) {
        //   // Voting is closed
        //   return "voting closed";
        // };
        let updatedOptions = {
          op1 = proposal.options.op1;
          count1 = if (selectedOption == proposal.options.op1) {
            proposal.options.count1 +1;
          } else {
            proposal.options.count1;
          };

          op2 = proposal.options.op1;
          count2 = if (selectedOption == proposal.options.op2) {
            proposal.options.count2 +1;
          } else {
            proposal.options.count2;
          };
          op3 = proposal.options.op3;
          count3 = if (selectedOption == proposal.options.op3) {
            proposal.options.count3 +1;
          } else {
            proposal.options.count3;
          };

          op4 = proposal.options.op4;
          count4 = if (selectedOption == proposal.options.op4) {
            proposal.options.count4 +1;
          } else {
            proposal.options.count4;
          };

          op5 = proposal.options.op5;
          count5 = if (selectedOption == proposal.options.op5) {
            proposal.options.count5 +1;
          } else {
            proposal.options.count5;
          };
        };
        let updatedListing = {
          proposal with
          options = updatedOptions;
        };
        // Save the updated proposal
        Debug.print(debug_show (("=>", updatedOptions)));

        // Record the voter's vote
        let newVote = {
          voter = msg.caller;
          proposalId = proposalId;
          vote = selectedOption;
          voteTime = currentTime;
        };
        map.put(proposalId, updatedListing);

        owners.put(msg.caller, newVote);

        return "success";
      };
    };
  };

  // // Cast a vote on a proposal
  // public func voteOnProposal(proposalId : Nat, voteType : VoteType) : async Bool {
  //   let voter = Principal.fromActor(ProposalsManager); // Getting the caller's Principal
  //   let currentTime = Time.now();
  //   switch (proposalMap.get(proposalId)) {
  //     case (null) { return false }; // Proposal not found
  //     case (?proposal) {
  //       if (proposal.status.open and Time.before(currentTime, proposal.endTime)) {
  //         // Add the vote to the votes array and update the proposal status
  //         let newVote : Vote = {
  //           voter = voter;
  //           proposalId = proposalId;
  //           voteType = voteType;
  //           voteTime = currentTime;
  //         };
  //         votes.append(newVote);
  //         switch (voteType) {
  //           case (#Yes) { proposal.status.yesVotes += 1 };
  //           case (#No) { proposal.status.noVotes += 1 };
  //         };
  //         proposalMap.put(proposalId, proposal);
  //         // If voting period has ended, finalize proposal and issue rewards
  //         if (not Time.before(currentTime, proposal.endTime)) {
  //           finalizeProposal(proposal);
  //         };
  //         return true;
  //       } else {
  //         return false; // Voting closed
  //       };
  //     };
  //   };
  // };

  // // Finalize a proposal and handle rewards
  // private func finalizeProposal(proposal : Proposal) : async () {
  //   // proposal.status.open := false;
  //   if (proposal.status.yesVotes > proposal.status.noVotes) {
  //     // Process rewards if the proposal was accepted
  //     // ... Reward logic goes here ...
  //   };
  // };

  // // Retrieve proposal details
  // public query func getProposal(proposalId : Nat) : async ?Proposal {
  //   return proposalMap.get(proposalId);
  // };

  // // Retrieve all open proposals
  // public query func getAllOpenProposals() : async [Proposal] {
  //   return Array.filter(proposals, func(p : Proposal) : Bool { p.status.open });
  // };

  // // ... Other necessary functions like reward distribution, proposal querying, etc.

  // // Upgrade handlers for stable storage
  system func preupgrade() {
    mapEntries := Iter.toArray(map.entries());
    ownerEntries := Iter.toArray(owners.entries());

  };

  system func postupgrade() {
    map := HashMap.fromIter<Text, Proposal>(mapEntries.vals(), 1, Text.equal, Text.hash);
    owners := HashMap.fromIter<Principal, Vote>(ownerEntries.vals(), 1, Principal.equal, Principal.hash);

    // Reconstruct in-memory maps from stable storage after upgrade
  };
};
